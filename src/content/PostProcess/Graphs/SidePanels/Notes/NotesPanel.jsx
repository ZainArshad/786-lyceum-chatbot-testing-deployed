import { TextArea } from 'src/components/Forms';
import Scrollbar from 'src/components/Scrollbar';
import {
	HeadedContainer,
	OperationsPanelCtn,
} from 'src/content/PostProcess/components';
import { useSession } from 'src/content/PostProcess/hooks/useSession';

export const NotesPanel = () => {
	const { isOwner } = useSession();
	return (
		<Scrollbar autoHide={false}>
			<OperationsPanelCtn>
				<HeadedContainer heading="Group 1">
					<TextArea
						placeholder="Enter notes here"
						disabled={!isOwner}
						minRows={12}
						maxRows={isOwner ? null : 15}
						sx={{ resize: 'none', fontFamily: 'sans-serif', fontSize: '14px' }}
					/>
				</HeadedContainer>
			</OperationsPanelCtn>
		</Scrollbar>
	);
};
