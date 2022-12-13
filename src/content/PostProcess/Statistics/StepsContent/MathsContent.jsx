import { InputLabel, MenuItem, Stack, Select } from '@mui/material';
import React, { useContext } from 'react';
import { Center, FlexApart } from 'src/components/shared/wrappers';
import { useFormik } from 'formik';
import {
	AVAILABLE_STAT_FUNCS,
	AVAILABLE_STAT_OPTS,
	statFuncAllowOperation,
} from 'src/lib/helpers/statistics';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'src/store';
import {
	setMath,
	selectPPStatBoxMath,
} from 'src/slices/postProcessing/statistics';
import { StatInstanceContext } from '../../context';
import { StatFormControl } from '../StatFormControl';
import { ppgraphPanelHeight } from '../../constants';

export const MathsContent = () => {
	const { statId } = useContext(StatInstanceContext);
	const dispatch = useDispatch();
	const math = useSelector(
		selectPPStatBoxMath,
		(a, b) => a[statId] === b[statId]
	)[statId];

	const formik = useFormik({
		initialValues: {
			func: math.func || '',
			operation: math.operation || '',
		},
		validationSchema: Yup.object().shape({
			func: Yup.string().required('Required'),
			operation: Yup.string().when('func', {
				is: (func) => statFuncAllowOperation(func),
				then: Yup.string().required('Required'),
				otherwise: Yup.string().notRequired(),
			}),
		}),
		validateOnMount: true,
		onSubmit: (values) => {
			dispatch(
				setMath({
					statBoxId: statId,
					...values,
				})
			);
		},
	});

	return (
		<FlexApart flexDirection="column" sx={{ minHeight: ppgraphPanelHeight }}>
			<Center flex={1}>
				<Stack sx={{ width: '30rem' }} spacing={2}>
					<Stack>
						<InputLabel>Select Function</InputLabel>
						<Select
							name="func"
							fullWidth
							value={formik.values.func}
							onChange={(e) => {
								if (!statFuncAllowOperation(e.target.value)) {
									formik.setFieldValue('operation', '');
								}
								formik.handleChange(e);
							}}
						>
							{AVAILABLE_STAT_FUNCS.map((fc) => (
								<MenuItem key={fc.code} value={fc.code}>
									{fc.name}
								</MenuItem>
							))}
						</Select>
					</Stack>
					{statFuncAllowOperation(formik.values.func) && (
						<Stack>
							<InputLabel>Operations</InputLabel>
							<Select
								name="operation"
								fullWidth
								onChange={formik.handleChange}
								value={formik.values.operation}
							>
								{AVAILABLE_STAT_OPTS.map((op) => (
									<MenuItem value={op.code} key={op.code}>
										{op.name}
									</MenuItem>
								))}
							</Select>
						</Stack>
					)}
				</Stack>
			</Center>
			<StatFormControl
				disableNext={!formik.isValid}
				onNext={() => {
					formik.handleSubmit();
					return true;
				}}
			/>
		</FlexApart>
	);
};
