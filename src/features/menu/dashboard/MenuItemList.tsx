import { MenuItem } from '../../../app/types/menuItem';
import MenuItemCard from './MenuItemCard';

type Props = {
    menuItems: MenuItem[]
}

export default function MenuItemList({ menuItems }: Props) {
    return (
        <>
            <h1>Menu</h1>
            {menuItems.map(menuItem => (
                <MenuItemCard
                    key={menuItem.id}
                    menuItem={menuItem}
                />
            ))}
        </>
    )
}