import { Button, ButtonProps } from '@chakra-ui/core';
import { FiEdit } from 'react-icons/fi';
import { useCMS } from 'tinacms';

export const TinaEditLink: React.FC<Omit<ButtonProps, 'children'>> = (props) => {
  const cms = useCMS();
  return (
    <Button leftIcon={<FiEdit />} onClick={() => cms.toggle()} {...props}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </Button>
  );
};
export default TinaEditLink;
