import {
	Tooltip,
	CardActionArea,
	styled,
	Card,
	Avatar,
	CardContent,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

const CardAddAction = styled(Card)(
	({ theme }) => `
          border: ${theme.colors.primary.main} dashed 1px;
          height: 100%;
          color: ${theme.colors.primary.main};
          transition: ${theme.transitions.create(['all'])};
          
          .MuiCardActionArea-root {
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          
          .MuiTouchRipple-root {
            opacity: .2;
          }
          
          &:hover {
            border-color: ${theme.colors.alpha.black[70]};
          }
  `
);

const AvatarAddWrapper = styled(Avatar)(
	({ theme }) => `
          background: ${theme.colors.alpha.black[5]};
          color: ${theme.colors.primary.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
  `
);

function NewOrganizationCard() {
	const { t } = useTranslation();
	return (
		<Tooltip arrow title={t('Click to add a new organization')}>
			<CardAddAction>
				<CardActionArea
					sx={{
						px: 1,
					}}
				>
					<CardContent>
						<AvatarAddWrapper>
							<AddTwoToneIcon fontSize="large" />
						</AvatarAddWrapper>
					</CardContent>
				</CardActionArea>
			</CardAddAction>
		</Tooltip>
	);
}

export default NewOrganizationCard;
