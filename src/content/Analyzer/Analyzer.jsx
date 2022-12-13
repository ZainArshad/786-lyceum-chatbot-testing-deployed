import React from 'react';
import { useTranslation } from 'next-i18next';
import { PageHeading } from 'src/components/shared/Typography';
import { PageBodyWrapper } from 'src/components/shared/wrappers';
import { AnalyzerContent } from './AnalyzerContent';

export const Analyzer = () => {
	const { t } = useTranslation();
	return (
		<PageBodyWrapper>
			<PageHeading>{t('Analyze')}</PageHeading>
			<AnalyzerContent />
		</PageBodyWrapper>
	);
};
