import { PageContentWrapper } from 'src/components/styled';
import Pinboard from 'src/components/Pinboard/Pinboard';
import StorageComponent from './StorageComponent';

function StoragePlan() {
	return (
		<PageContentWrapper>
			<StorageComponent />
			<Pinboard />
		</PageContentWrapper>
	);
}

export default StoragePlan;
