export const generateJSONTemplatePayload = (injState, sheetAxisInfo) => {
	return {
		formState: {
			fileUpload: {
				nameOrTitle: injState.fileUpload.nameOrTitle,
			},
			documentType: { ...injState.documentType },
			tags: injState.tags,
			groups: injState.groups,
			descriptors: injState.descriptors,
		},
		jsonAxisInfo: sheetAxisInfo,
	};
};

export const generateGroupsPayload = (gruops) => {
	const res = [];

	gruops.forEach((group) => {
		res.push(group.organizationId);
	});
	return res;
};

export const generateCategoryPayload = (categories) => {
	categories.forEach((category) => {
		delete category.category_sheet_common_axis;
	});
	return categories;
};
