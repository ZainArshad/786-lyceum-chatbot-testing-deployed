import { PageContentWrapper } from 'src/components/styled';
import Pinboard from 'src/components/Pinboard/Pinboard';
import PrivateOrganizationForm from './PrivateOrganizationForm';

const PrivateOrganizationPage = () => {
	return (
		<PageContentWrapper>
			<PrivateOrganizationForm />
			<Pinboard />
		</PageContentWrapper>
	);
};

export default PrivateOrganizationPage;
