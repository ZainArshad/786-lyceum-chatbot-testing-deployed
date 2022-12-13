import { Box, Typography, useTheme } from '@mui/material';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import 'react-data-grid/lib/styles.css';

import { useContext, useEffect, useRef, useState, useCallback } from 'react';
import DataGrid from 'react-data-grid';
import { DropDownSelect, Input } from 'src/components/Forms';
import Loading from 'src/components/Loader';
import Scrollbar from 'src/components/Scrollbar';
import { DottedDivider } from 'src/components/shared';
import { BackButton } from 'src/components/shared/Buttons';
import { PageHeading } from 'src/components/shared/Typography';
import {
	BrickBodyCtn,
	FlexApart,
	PageBodyWrapper,
} from 'src/components/shared/wrappers';
import { DataInjestorContext } from 'src/contexts/DataInjestorContext';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { downloadObjectAsJSONFile } from 'src/lib/helpers/common/actioners';
import { getFormattedFileSize } from 'src/lib/helpers/format';
import {
	checkInvalidSheetCells,
	convertWb,
	downloadExcelFile,
	getRowNColIdx,
	getRowsCols,
	getSheetHeadersFromWorkbook,
	manipulateDublicateEntries,
	prep,
} from 'src/lib/helpers/xlsx';
import { useProjectMetaDataQuery } from 'src/queries/project';
import { makeProjectRequest } from 'src/services/api/project';
import { utils } from 'xlsx';
import { uploadFileToS3 } from 'src/lib/helpers/content/fileUpload';
import { CUUnitsModal } from 'src/components/Modals/CUUnitsModal';
import { generateCategoryPayload, generateJSONTemplatePayload } from './utils';
import {
	InfoCell,
	InputTitle,
	SheetCellUtilBar,
	UploadButton,
	WorkBookWrapper,
} from './DataCleaningComponents';

export function DataCleaningContent() {
	const theme = useTheme();
	const { t } = useTranslation();
	const router = useRouter();
	const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarNotifications();

	const { data: projMetaDataRes, isLoading: isProjectMetadataLoading } =
		useProjectMetaDataQuery();

	const [createUnitModalOpen, setCreateUnitModalOpen] = useState(false);
	const [rows, setRows] = useState([]);
	const [sheetHeaderRows, setSheetHeaderRows] = useState([]);
	const [columns, setColumns] = useState([]);
	const [workBook, setWorkBook] = useState({});
	const [sheetNames, setSheetNames] = useState([]);
	const [currentSheet, setCurrentSheet] = useState('');
	const [sheetAxisUnits, setSheetAxisUnits] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [invalidCells, setInvalidCells] = useState({});
	const [fileProcessing, setFileProcessing] = useState(true);
	const gridRef = useRef();

	const { dataInjState } = useContext(DataInjestorContext);
	const { fileUpload, tags, jsonAxisInfo, documentType, descriptors, groups } =
		dataInjState;
	let worker;

	useEffect(() => {
		if (!fileUpload.file) {
			router.push('/data-ingestor');
		} else {
			setUpExcelFile(fileUpload.file);
		}
		return () => {
			setRows([]);
			setColumns([]);
			setWorkBook({});
			setSheetNames([]);
			setCurrentSheet('');
			setSheetAxisUnits({});
			if (worker) {
				worker.terminate();
			}
		};
	}, [fileUpload.file]);

	async function setUpExcelFile(uploadedFile) {
		const file = await uploadedFile.arrayBuffer();
		if (window.Worker) {
			worker = new Worker(new URL('./sheetLoader.js', import.meta.url));
			worker.postMessage({ file });
			worker.onmessage = async (e) => {
				if (e.data.status === 'success') {
					const parsedXLSXFromWorker = JSON.parse(e.data.fileData);
					await handleInitailExcelSetup(parsedXLSXFromWorker);
					setFileProcessing(false);
				}
				if (e.data.status === 'error') {
					setFileProcessing(false);
				}
			};
		}
	}

	const handleInitailExcelSetup = (sheetData) => {
		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async (resolve) => {
			setWorkBook(sheetData.Sheets);
			setSheetNames(manipulateDublicateEntries(sheetData.SheetNames));
			setSheetHeaderRows(getSheetHeadersFromWorkbook(sheetData));
			await checkInvalidSheetCells(sheetData, setInvalidCells);
			sheetData.SheetNames.forEach((_, i) =>
				setSheetAxisUnits((prev) => {
					const idx = String(i);
					return {
						...prev,
						[idx]: {
							category: jsonAxisInfo[idx]?.category || '',
							category_sheet_common_axis:
								jsonAxisInfo[idx]?.category_sheet_common_axis || '',
							x_axis: jsonAxisInfo[idx]?.x_axis || '',
							y_axis: jsonAxisInfo[idx]?.y_axis || '',
							index_column: jsonAxisInfo[idx]?.index_column || '',
						},
					};
				})
			);
			resolve();
		});
	};

	const isSheetFormDataFilled = (sheetName) => {
		const sheetIdx = sheetNames.indexOf(sheetName || currentSheet);
		const sheetData = sheetAxisUnits[sheetIdx];
		if (
			sheetData &&
			sheetData.category &&
			sheetData.x_axis &&
			sheetData.y_axis &&
			sheetData.index_column &&
			sheetData.category_sheet_common_axis
		) {
			return true;
		}
		return false;
	};

	const commitChangesInCurrentSheet = () => {
		workBook[currentSheet] = utils.json_to_sheet(rows, {
			header: columns.map((col) => col.key),
			skipHeader: true,
		});
	};

	const selectSheet = (name, reset = true) => {
		if (reset) commitChangesInCurrentSheet();
		const { rows: new_rows, columns: new_columns } = getRowsCols(
			workBook,
			name
		);
		setRows(new_rows);
		setColumns(new_columns);
		setCurrentSheet(name);
	};

	const getCurrentAxisValues = () => {
		const sheetIdx = sheetNames.indexOf(currentSheet);
		return sheetAxisUnits[sheetIdx];
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const sheetIdx = sheetNames.indexOf(currentSheet);
		const currentValues = sheetAxisUnits[sheetIdx];
		if (name === 'commonAxisColumn') {
			currentValues.category_sheet_common_axis = value;
			currentValues.category = currentSheet;
			const headerRowIdx = utils.decode_col(value);
			if (!(headerRowIdx < 0) && sheetHeaderRows[sheetIdx][headerRowIdx]) {
				currentValues.index_column = sheetHeaderRows[sheetIdx][headerRowIdx];
			} else {
				currentValues.index_column = '';
			}
		}
		if (name === 'xAxisUnits') {
			currentValues.x_axis = value;
		}
		if (name === 'yAxisUnits') {
			currentValues.y_axis = value;
		}

		setSheetAxisUnits((prev) => {
			return {
				...prev,
				[sheetIdx]: currentValues,
			};
		});
	};

	const validSheetsInfo = () =>
		_.values(sheetAxisUnits).every(
			(sheet) =>
				sheet.category && sheet.x_axis && sheet.y_axis && sheet.index_column
		);

	const generatePayload = (fileUrl) => {
		return {
			file_url: fileUrl,
			name: fileUpload.nameOrTitle,
			units: generateCategoryPayload(_.values(sheetAxisUnits)),
			tags,
			descriptors,
			groups,
			file_type: documentType.fileType,
			data_type: documentType.dataType,
		};
	};

	const processUpdatedFile = (workBook) => {
		const newWorkbook = utils.book_new();

		sheetNames.forEach((sn) => {
			const sheetJson = utils.sheet_to_json(workBook[sn], { header: 1 });
			const newWorksheet = utils.aoa_to_sheet(prep(sheetJson));
			utils.book_append_sheet(newWorkbook, newWorksheet, sn);
		});

		return newWorkbook;
	};

	const handleSubmission = async (selections) => {
		setIsLoading(true);
		commitChangesInCurrentSheet();
		const userEditedWb = processUpdatedFile(workBook);
		if (selections.excel) {
			downloadExcelFile(
				userEditedWb,
				`si6ma_${fileUpload.file.name.replaceAll(' ', '_')}`
			);
		}
		if (selections.template) {
			downloadObjectAsJSONFile(
				generateJSONTemplatePayload(dataInjState, sheetAxisUnits),
				`si6ma_${fileUpload.file.name.split('.')[0].replace(' ', '_')}_template`
			);
		}
		try {
			const fileToUpload = await convertWb(userEditedWb);
			const fileUrl = await uploadFileToS3(fileToUpload, {
				fileExtension: '.xlsx',
				raw: true,
				basePath: 'data-ingestor/',
			});
			const projCreateRes = await makeProjectRequest.createProject(
				generatePayload(fileUrl)
			);

			if (projCreateRes.status === 201) {
				showSuccessSnackbar('Project Created Successfully');
				router.push('/');
			}
		} catch (error) {
			console.error(error);
			showErrorSnackbar('Something went wrong');
		} finally {
			setIsLoading(false);
		}
	};

	const calculateTotalInvalidCells = (invcells) => {
		return _.sum(Object.keys(invcells).map((key) => invcells[key].length));
	};

	const handleCellDataChange = (newRows, editedCellData) => {
		setRows(newRows);
		const tgCellLocation = `${editedCellData.column.name}${
			editedCellData.indexes[0] + 1
		}`;

		if (
			!newRows[editedCellData.indexes[0]][String(editedCellData.column.idx)]
		) {
			if (!invalidCells[currentSheet].includes(tgCellLocation)) {
				setInvalidCells((prev) => ({
					...prev,
					[currentSheet]: [...prev[currentSheet], tgCellLocation],
				}));
			}
		} else if (invalidCells[currentSheet].includes(tgCellLocation)) {
			setInvalidCells((prev) => ({
				...prev,
				[currentSheet]: prev[currentSheet].filter(
					(cell) => cell !== tgCellLocation
				),
			}));
		}
	};

	const scrollToCell = () => {
		if (!invalidCells[currentSheet]?.length === 0) return;
		const { c: colIdx, r: rowIdx } = getRowNColIdx(
			invalidCells[currentSheet][0]
		);
		gridRef.current.scrollToRow(rowIdx);
		gridRef.current.scrollToColumn(colIdx);
		gridRef.current.selectCell({ idx: colIdx, rowIdx });
	};

	return (
		<PageBodyWrapper>
			<FlexApart>
				<PageHeading>{t('Cleaning Data')}</PageHeading>
				<BackButton onClick={() => router.push('/data-ingestor')}>
					{t('Back')}
				</BackButton>
			</FlexApart>
			<BrickBodyCtn>
				{fileProcessing ? (
					<Loading />
				) : (
					<>
						<Box
							sx={{
								display: 'grid',
								gridTemplateColumns: { lg: '1fr 1fr' },
								columnGap: theme.spacing(2),
							}}
						>
							<Box
								sx={{
									display: 'grid',
									gridTemplateColumns: { md: '1fr 1fr' },
									columnGap: theme.spacing(3),
									rowGap: { xs: theme.spacing(1) },
								}}
							>
								<InfoCell
									boxContent={getFormattedFileSize(
										dataInjState.fileUpload.file?.size
									)}
									contentTitle={t('Upload Size')}
								/>
								<InfoCell
									boxContent={calculateTotalInvalidCells(
										invalidCells
									).toString()}
									contentTitle={t('Invalid Cells')}
								/>
							</Box>
							<Box
								sx={{
									display: 'flex',
									justifyContent: { lg: 'flex-end', xs: 'center' },
									mt: { xs: theme.spacing(2) },
								}}
							>
								<UploadButton
									handleUpload={handleSubmission}
									isLoading={isLoading}
									disabled={
										!validSheetsInfo() ||
										isLoading ||
										Boolean(calculateTotalInvalidCells(invalidCells))
									}
								/>
							</Box>
						</Box>
						<DottedDivider sx={{ m: theme.spacing(4, 0) }} />
						{/* Column Info Inputs */}
						<Box
							sx={{
								display: 'grid',
								gridTemplateColumns: { lg: '1fr 1fr 1fr' },
								columnGap: theme.spacing(2),
							}}
						>
							<Box>
								<InputTitle>{t('Common axis column')}</InputTitle>
								<Input
									sx={{ width: '100%' }}
									id="common-axis-column"
									name="commonAxisColumn"
									placeholder={t('Enter common axis column')}
									value={
										getCurrentAxisValues()?.category_sheet_common_axis || ''
									}
									disabled={
										!currentSheet || isLoading || isProjectMetadataLoading
									}
									onChange={handleInputChange}
								/>
							</Box>
							<Box>
								<InputTitle>{t('X-Axis Units')}</InputTitle>
								<DropDownSelect
									name="xAxisUnits"
									value={getCurrentAxisValues()?.x_axis || ''}
									handleChange={handleInputChange}
									items={projMetaDataRes?.x_units || []}
									loading={isProjectMetadataLoading}
									disabled={!currentSheet || isLoading}
									emptyPlaceHolder={t('Select Units')}
									showNewItemButton
									newItemButtonOnClick={() => setCreateUnitModalOpen(true)}
								/>
							</Box>
							<Box>
								<InputTitle>{t('Y-Axis Units')}</InputTitle>
								<DropDownSelect
									name="yAxisUnits"
									value={getCurrentAxisValues()?.y_axis || ''}
									handleChange={handleInputChange}
									loading={isProjectMetadataLoading}
									disabled={!currentSheet || isLoading}
									items={projMetaDataRes?.y_units || []}
									emptyPlaceHolder={t('Select Units')}
									showNewItemButton
									newItemButtonOnClick={() => setCreateUnitModalOpen(true)}
								/>
							</Box>
						</Box>
						{/* Utils Button Panel */}
						<SheetCellUtilBar
							handleNextClick={scrollToCell}
							nextDisabled={
								!currentSheet || invalidCells[currentSheet]?.length === 0
							}
						/>
						{/* Excel Data and Page Tabs */}
						<Box sx={{ display: 'flex', mt: theme.spacing(2) }}>
							<Box
								sx={{
									minWidth: theme.typography.pxToRem(256),
									backgroundColor: theme.forms.colors.inputsBg,
									border: `1px solid ${theme.colors.rawColors.secondaryL}`,
									borderRadius: theme.general.borderRadius,
									maxHeight: '564px',
									padding: theme.spacing(3, 2),
								}}
							>
								<Typography
									sx={{
										fontSize: theme.typography.h2,
										fontWeight: 500,
										color: theme.colors.rawColors.fontSecondary,
										mb: theme.spacing(1),
									}}
								>
									{t('Pages')}
								</Typography>
								<Box sx={{ height: '500px' }}>
									<Scrollbar>
										{sheetNames.map((sheet) => (
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													height: theme.typography.pxToRem(55),
													backgroundColor:
														isSheetFormDataFilled(sheet) &&
														invalidCells[sheet].length === 0
															? theme.colors.success.main
															: sheet === currentSheet
															? theme.colors.primary.lighter
															: theme.colors.primary.main,
													my: theme.spacing(1),
													borderRadius: theme.general.borderRadius,
													color: theme.colors.rawColors.trueWhite,
													'&:hover': {
														cursor: 'pointer',
														opacity: 0.92,
													},
												}}
												key={sheet}
												onClick={() => selectSheet(sheet)}
											>
												{sheet}
											</Box>
										))}
									</Scrollbar>
								</Box>
							</Box>
							<WorkBookWrapper
								sx={{
									overflow: 'hidden',
									ml: theme.spacing(1.5),
									flex: 1,
								}}
							>
								{!currentSheet ? (
									<h1>Select a sheet to continue</h1>
								) : (
									<DataGrid
										defaultColumnOptions={{
											sortable: false,
											resizable: true,
										}}
										ref={gridRef}
										columns={columns}
										rows={rows}
										onRowsChange={handleCellDataChange}
										enableVirtualization
									/>
								)}
							</WorkBookWrapper>
						</Box>
					</>
				)}
			</BrickBodyCtn>
			<CUUnitsModal
				open={createUnitModalOpen}
				handleClose={useCallback(() => setCreateUnitModalOpen(false))}
			/>
		</PageBodyWrapper>
	);
}

DataCleaningContent.propTypes = {};
