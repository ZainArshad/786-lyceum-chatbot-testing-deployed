import React, { useContext, useState } from 'react';
import { GraphInstanceContext } from 'src/content/PostProcess/context/GraphInstanceContext';
import { Typography, Switch } from '@mui/material';
import Scrollbar from 'src/components/Scrollbar';
import {
	GraphPoprtiesFlexApart,
	OperationsPanelCtn,
} from 'src/content/PostProcess/components';
import { useTranslation } from 'next-i18next';
import { Input, DropDownSelect } from 'src/components/Forms';
import { shallowEqual } from 'react-redux';
import {
	selectPPProperties,
	toggleLegend,
	setXscale,
	setYscale,
	setXhigh,
	setXlow,
	setYhigh,
	setYlow,
} from 'src/slices/postProcessing/graphs';
import { useSelector, useDispatch } from 'src/store';

const axisOptions = [
	{ label: 'Linear', value: 'linear' },
	{ label: 'Logrithmic', value: 'logarithmic' },
];

export const PropertiesPanel = () => {
	const { t } = useTranslation();
	const { graphId } = useContext(GraphInstanceContext);
	const dispatch = useDispatch();
	const propertiesPrefs = useSelector(selectPPProperties, (left, right) => {
		return shallowEqual(left[graphId], right[graphId]);
	});

	const [xHigh, _setXHigh] = useState(propertiesPrefs[graphId]?.xHigh || null);
	const [xLow, _setXLow] = useState(propertiesPrefs[graphId]?.xLow || null);
	const [yHigh, _setYHigh] = useState(propertiesPrefs[graphId]?.yHigh || null);
	const [yLow, _setYLow] = useState(propertiesPrefs[graphId]?.yLow || null);

	const handleToggleLegend = (e) => {
		dispatch(toggleLegend({ graphId, value: e.target.checked }));
	};

	const handleSetXscale = (e) => {
		dispatch(setXscale({ graphId, value: e.target.value }));
	};

	const handleSetYscale = (e) => {
		dispatch(setYscale({ graphId, value: e.target.value }));
	};

	const handleSetXhigh = (e) => {
		dispatch(setXhigh({ graphId, value: e.target.value || null }));
	};

	const handleSetXlow = (e) => {
		dispatch(setXlow({ graphId, value: e.target.value || null }));
	};

	const handleSetYhigh = (e) => {
		dispatch(setYhigh({ graphId, value: e.target.value || null }));
	};

	const handleSetYlow = (e) => {
		dispatch(setYlow({ graphId, value: e.target.value || null }));
	};

	return (
		<Scrollbar>
			<OperationsPanelCtn
				className="properties-panel"
				// sx={{
				//   '.properties-panel > *': {
				//     pointerEvents: isOwner ? null : 'none'
				//   }
				// }}
			>
				<GraphPoprtiesFlexApart>
					<Typography>{t('Legen On/Off')}</Typography>
					<Switch
						onChange={handleToggleLegend}
						checked={propertiesPrefs[graphId]?.legend || false}
					/>
				</GraphPoprtiesFlexApart>
				<GraphPoprtiesFlexApart>
					<Typography>{t('X High')}</Typography>
					<Input
						type="number"
						size="small"
						sx={{ flex: 0.5 }}
						onBlur={handleSetXhigh}
						onChange={(e) => _setXLow(e.target.value)}
						value={xLow || ''}
					/>
				</GraphPoprtiesFlexApart>
				<GraphPoprtiesFlexApart>
					<Typography>{t('X Low')}</Typography>
					<Input
						type="number"
						size="small"
						sx={{ flex: 0.5 }}
						onChange={(e) => _setXHigh(e.target.value)}
						value={xHigh || ''}
						onBlur={handleSetXlow}
					/>
				</GraphPoprtiesFlexApart>
				<GraphPoprtiesFlexApart>
					<Typography>{t('X Scale')}</Typography>
					<DropDownSelect
						value={propertiesPrefs[graphId]?.xScale || 'linear'}
						items={axisOptions}
						size="small"
						containerStyles={{ flex: 0.517 }}
						showPlaceHolder={false}
						handleChange={handleSetXscale}
					/>
				</GraphPoprtiesFlexApart>
				<GraphPoprtiesFlexApart>
					<Typography>{t('Y High')}</Typography>
					<Input
						type="number"
						size="small"
						sx={{ flex: 0.5 }}
						value={yHigh || ''}
						onChange={(e) => _setYHigh(e.target.value)}
						onBlur={handleSetYhigh}
					/>
				</GraphPoprtiesFlexApart>
				<GraphPoprtiesFlexApart>
					<Typography>{t('Y Low')}</Typography>
					<Input
						type="number"
						size="small"
						onChange={(e) => _setYLow(e.target.value)}
						value={yLow || ''}
						sx={{ flex: 0.5 }}
						onBlur={handleSetYlow}
					/>
				</GraphPoprtiesFlexApart>
				<GraphPoprtiesFlexApart>
					<Typography>{t('Y Scale')}</Typography>
					<DropDownSelect
						value={propertiesPrefs[graphId]?.yScale || 'linear'}
						items={axisOptions}
						size="small"
						containerStyles={{ flex: 0.517 }}
						showPlaceHolder={false}
						handleChange={handleSetYscale}
					/>
				</GraphPoprtiesFlexApart>
			</OperationsPanelCtn>
		</Scrollbar>
	);
};
