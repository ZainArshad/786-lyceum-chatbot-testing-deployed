import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import _ from 'lodash';
import { Input } from 'src/components/Forms';
import { useTranslation } from 'next-i18next';
import { FlexApart } from 'src/components/shared/wrappers';
import {
	isConstantFieldAllowed,
	isSlaveNodeInstanceAllowed,
	maxSlaveNodesAllowed,
	shouldShowArrangementStep,
	statFuncAllowOperation,
} from 'src/lib/helpers/statistics';
import { useDispatch, useSelector } from 'src/store';
import {
	selectPPStatBoxMath,
	setNodesStepMeta,
	selectPPStatBoxNodes,
} from 'src/slices/postProcessing/statistics';
import { StatInstanceContext } from 'src/content/PostProcess/context';
import { useContext } from 'react';
import { shallowEqual } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { StatFormControl } from '../../StatFormControl';
import {
	INSTANCE_TYPE_MASTER,
	INSTANCE_TYPE_SLAVE,
	ppgraphPanelHeight,
} from '../../../constants';
import { MemNodesInstance as NodesInstance } from './NodesInstance';

export const NodesContent = () => {
	const theme = useTheme();
	const { t } = useTranslation();
	const { statId } = useContext(StatInstanceContext);
	const { showWarningSnackbar } = useSnackbarNotifications();
	const dispatch = useDispatch();
	const equateShallow = (left, right) => {
		return shallowEqual(left[statId], right[statId]);
	};
	const nodes = useSelector(selectPPStatBoxNodes, equateShallow)[statId];
	const math = useSelector(selectPPStatBoxMath, equateShallow)[statId];
	const { func, operation } = math;

	const formik = useFormik({
		initialValues: {
			appendName: nodes.appendName || '',
			operatorConst: nodes.operatorConst || '',
		},
		validationSchema: Yup.object().shape({
			appendName: Yup.string().required(t('Required')).max(20, t('Max 20')),
			operatorConst: Yup.number().when('_', {
				is: () => isConstantFieldAllowed(func, operation),
				then: Yup.number().required(t('Required')),
			}),
		}),
		onSubmit: (values) => {
			dispatch(
				setNodesStepMeta({
					statBoxId: statId,
					...values,
				})
			);
		},
	});

	const handleNextFromNodes = () => {
		const totalSlaveNodes = _.get(nodes, 'nodes.slaveNodes.length', 0);
		const totalMasterNodes = _.get(nodes, 'nodes.masterNodes.length', 0);
		if (!totalMasterNodes) {
			showWarningSnackbar(t('Please select at least one primary node'));
			return false;
		}
		if (!statFuncAllowOperation(math.func)) {
			return 2;
		}
		if (isSlaveNodeInstanceAllowed(math.func, math.operation)) {
			if (totalSlaveNodes === 0) {
				showWarningSnackbar(t('Please select at least one secondary node'));
				return false;
			}
			const maxSlaveNodes = maxSlaveNodesAllowed(
				math.func,
				math.operation,
				totalMasterNodes
			);
			if (totalSlaveNodes !== maxSlaveNodes) {
				showWarningSnackbar(
					`${t('Secondary nodes count must be equal to')} ${maxSlaveNodes}`
				);
				return false;
			}
			if (shouldShowArrangementStep(math.func, math.operation)) {
				return 1;
			}
		}
		return 2;
	};

	return (
		<FlexApart flexDirection="column" sx={{ minHeight: ppgraphPanelHeight }}>
			<Grid container spacing={3} sx={{ height: ppgraphPanelHeight }}>
				<Grid item md={4} sm={12}>
					<NodesInstance instanceType={INSTANCE_TYPE_MASTER} />
				</Grid>
				<Grid item md={4} sm={12}>
					{isConstantFieldAllowed(func, operation) && (
						<Box sx={{ p: theme.spacing(2, 1.5), width: '100%' }}>
							<Typography variant="h6">{t('Constant')}</Typography>
							<Input
								type="number"
								fullWidth
								name="operatorConst"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={Boolean(
									formik.touched.operatorConst && formik.errors.operatorConst
								)}
								value={formik.values.operatorConst}
								helperText={formik.errors.operatorConst}
							/>
						</Box>
					)}
					{isSlaveNodeInstanceAllowed(func, operation) && (
						<NodesInstance instanceType={INSTANCE_TYPE_SLAVE} />
					)}
				</Grid>
				<Grid item md={4} sm={12} sx={{ height: '100%' }}>
					<Stack sx={{ p: theme.typography.pxToRem(18) }}>
						<Typography variant="h6">{t('Append Name to node(s)')}</Typography>
						<Input
							fullWidth
							name="appendName"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={Boolean(
								formik.touched.appendName && formik.errors.appendName
							)}
							helperText={formik.errors.appendName}
							value={formik.values.appendName}
						/>
					</Stack>
				</Grid>
			</Grid>
			<StatFormControl
				onNext={async () => {
					try {
						const err = await formik.validateForm();
						if (_.isEmpty(err)) {
							formik.handleSubmit();
							return handleNextFromNodes();
						}
					} catch (error) {
						console.error(error);
					}
				}}
			/>
		</FlexApart>
	);
};

NodesContent.propTypes = {};
