import { DataInjestorProvider } from 'src/contexts/DataInjestorContext';
import { PageContentWrapper } from 'src/components/styled';
import { useRouter } from 'next/router';
import { DataInjestorContent } from './DataInjestorContent';
import { DataCleaningContent } from './DataCleaning';

export const DataInjestor = () => {
	const router = useRouter();

	return (
		<PageContentWrapper>
			<DataInjestorProvider>
				{router.query.stage === 'clean' ? (
					<DataCleaningContent />
				) : (
					<DataInjestorContent />
				)}
			</DataInjestorProvider>
		</PageContentWrapper>
	);
};
