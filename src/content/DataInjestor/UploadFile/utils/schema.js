import mapValues from 'lodash/mapValues';
import * as Yup from 'yup';

export const DataInjestorTemplateSchema = Yup.object().shape({
	formState: Yup.object().shape({
		fileUpload: Yup.object().shape({
			nameOrTitle: Yup.string().required(),
		}),
		documentType: Yup.object().shape({
			fileType: Yup.string().required().oneOf(['xls']),
			dataType: Yup.string()
				.required()
				.oneOf(['measurement', 'limit', 'simulation']),
		}),
		tags: Yup.array().of(Yup.string()),
		groups: Yup.array().of(Yup.string().uuid()),
		descriptors: Yup.array().of(
			Yup.object().shape({
				descriptor: Yup.string().required().uuid(),
				value: Yup.string().required(),
			})
		),
	}),
	jsonAxisInfo: Yup.lazy((obj) =>
		Yup.object(
			mapValues(obj, (_value, key) => {
				if (Number(key)) {
					return Yup.object().shape({
						category: Yup.string().required(),
						category_sheet_common_axis: Yup.string()
							.required()
							.matches(/^[A-Z]+$/),
						x_axis: Yup.string().required(),
						y_axis: Yup.string().required(),
						index_column: Yup.string().required(),
					});
				}
			})
		)
	),
});
