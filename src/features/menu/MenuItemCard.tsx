import { Card, Image, Icon, Button } from 'semantic-ui-react';
import './MenuItemCard.css';
import { MenuItem } from '../../app/types/menuItem';

type Props = {
  menuItem: MenuItem;
};

export default function MenuItemCard({ menuItem }: Props) {
  return (
    <Card>
      <Image src={menuItem.imageUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{menuItem.title}</Card.Header>
        <Card.Meta>
          <span className='price'>{menuItem.price}</span>
        </Card.Meta>
        <Card.Description>{menuItem.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button basic color='green'>
          <Icon name='plus' />
        </Button>
      </Card.Content>
    </Card>
  );
};