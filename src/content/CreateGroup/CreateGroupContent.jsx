import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { FlexApart, PageBodyWrapper } from 'src/components/shared/wrappers';
import Link from 'src/components/Link';
import { PageHeading } from 'src/components/shared/Typography';
import { CreateGroupForm } from 'src/components/DataCollection/CreateGroupForm';
import { useRouter } from 'next/router';
import { Button } from 'src/components/shared/Buttons';

export function CreateGroupContent() {
	const { t } = useTranslation();
	const router = useRouter();

	return (
		<PageBodyWrapper>
			<FlexApart mb={1} flexDirection={{ xs: 'column', md: 'row' }}>
				<PageHeading>{t('Create New Group')}</PageHeading>
				<Link sx={{ textDecoration: 'none !important' }} href="/groups">
					<Button startIcon={<ArrowBackIcon />}>{t('Back to Groups')}</Button>
				</Link>
			</FlexApart>
			<CreateGroupForm
				onSuccess={() => router.push('/groups')}
				onCancel={() => router.push('/groups')}
			/>
		</PageBodyWrapper>
	);
}
