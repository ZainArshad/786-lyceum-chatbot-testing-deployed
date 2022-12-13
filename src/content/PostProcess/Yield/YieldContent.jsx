import React from 'react';
import {
	selectYieldGroups,
	addDefaultYieldBox,
} from 'src/slices/postProcessing/yield';
import { YieldInstanceProvider } from 'src/content/PostProcess/context';
import { useSelector, useDispatch } from 'src/store';
import _ from 'lodash';
import { Center } from 'src/components/shared/wrappers';
import { Button } from 'src/components/shared/Buttons';
import { useTranslation } from 'next-i18next';
import { YieldSession } from './YieldSession';
import { useSession } from '../hooks/useSession';

export const YieldContent = React.memo(() => {
	const { t } = useTranslation();
	const yieldGroups = useSelector(selectYieldGroups, (a, b) => {
		return _.keys(a).length === _.keys(b).length;
	});
	const dispatch = useDispatch();
	const { isOwner } = useSession();

	const handleAddDefaultYieldBox = () => dispatch(addDefaultYieldBox());

	const sortedYieldGroups = _.sortBy(
		_.entries(yieldGroups),
		(a) => a[1].createdAt
	);

	return (
		<>
			{sortedYieldGroups.map(([yieldId]) => (
				<YieldInstanceProvider key={yieldId} yieldId={yieldId}>
					<YieldSession />
				</YieldInstanceProvider>
			))}
			{isOwner && (
				<Center>
					<Button
						onClick={handleAddDefaultYieldBox}
						sx={{ my: (theme) => theme.spacing(2) }}
					>
						{t('Add Group')}
					</Button>
				</Center>
			)}
		</>
	);
});
