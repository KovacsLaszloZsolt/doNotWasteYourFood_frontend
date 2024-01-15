import { ReactElement } from 'react';
import { View } from 'react-native';
import { Button, Divider, IconButton, Portal, Modal as RNPModal, Text } from 'react-native-paper';

interface ModalProps {
  cancelButtonText?: string;
  confirmButtonText?: string;
  description?: string | ReactElement;
  isLoading?: boolean;
  isVisible: boolean;
  hasCloseButton?: boolean;
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const Modal = ({
  cancelButtonText,
  confirmButtonText,
  description,
  isLoading,
  isVisible,
  hasCloseButton = true,
  title,
  onClose,
  onConfirm
}: ModalProps): ReactElement => {
  const containerStyle = {
    backgroundColor: 'white',
    paddingTop: hasCloseButton ? 10 : 20,
    paddingBottom: 20,
    gap: 20,
    marginHorizontal: 20
  };

  return (
    <Portal>
      <RNPModal visible={isVisible} onDismiss={onClose} contentContainerStyle={containerStyle}>
        {title && (
          <View>
            <View
              className={`flex-row items-center justify-between ${
                hasCloseButton ? 'pl-5 pr-[10px] pb-[10px]' : 'px-5 pb-5'
              }`}
            >
              <Text className="" variant="titleLarge">
                {title}
              </Text>
              <IconButton className="m-0 p-0" onPress={onClose} icon={'close-circle'} size={30} />
            </View>
            <Divider />
          </View>
        )}
        {description && <Text className="text-center px-5">{description}</Text>}
        <View>
          <Divider />
          <View className="flex-row w-full justify-evenly mt-5">
            <Button className="" onPress={onClose} mode="contained">
              {cancelButtonText || 'Cancel'}
            </Button>
            <Button onPress={onConfirm} loading={isLoading} buttonColor="red" mode="contained">
              {confirmButtonText || 'Confirm'}
            </Button>
          </View>
        </View>
      </RNPModal>
    </Portal>
  );
};
