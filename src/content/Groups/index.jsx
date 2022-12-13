import { PageContentWrapper } from 'src/components/styled';
import PropTypes from 'prop-types';
import { GroupComponent } from './Home';

const GroupsPage = ({ setGroupname }) => {
	return (
		<PageContentWrapper>
			<GroupComponent setGroupname={setGroupname} />
		</PageContentWrapper>
	);
};

GroupsPage.propTypes = {
	setGroupname: PropTypes.func.isRequired,
};

export default GroupsPage;
