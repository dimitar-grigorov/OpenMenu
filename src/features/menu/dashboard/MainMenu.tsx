import { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
//import Navbar from '../Shared/Navbar/Navbar';
import ActiveFoodItem from './ActiveFoodItem';
//import Delivery from '../Shared/Delivery/Delivery';
//import Footer from '../Shared/Footer/Footer';
//import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
//import useReduxState from '../../hooks/useReduxState';
import './MainMenu.css';
import { FoodItem } from '../../../app/types/foodItem';
import { useAppSelector } from '../../../app/store/store';
import { useFireStore } from '../../../app/hooks/firestore/useFirestore';
import { actions } from '../../foodItemSlice';

const MainMenu = () => {
    document.title = 'Testo Burger | Menu';

    const icons = {
        burger: `https://res.cloudinary.com/dn9k2jkdd/image/upload/v1649786139/testo-burger-project/icons/burger_qgfla1.png`,
        fries: `https://res.cloudinary.com/dn9k2jkdd/image/upload/v1649786140/testo-burger-project/icons/french-fries_qourda.png`,
        salad: `https://res.cloudinary.com/dn9k2jkdd/image/upload/v1649786140/testo-burger-project/icons/salad_svw3qy.png`,
        dessert: `https://res.cloudinary.com/dn9k2jkdd/image/upload/v1649786140/testo-burger-project/icons/dessert_fh3ber.png`,
        pasta: `https://res.cloudinary.com/dn9k2jkdd/image/upload/v1649786140/testo-burger-project/icons/spaghetti_z9hpmp.png`,
        pizza: `https://res.cloudinary.com/dn9k2jkdd/image/upload/v1649786140/testo-burger-project/icons/pizza_m90jq6.png`
    };

    const bannerImage = 'https://res.cloudinary.com/dn9k2jkdd/image/upload/v1649786143/testo-burger-project/main-menu/menu-page_usa15j.jpg';

    const [foodCategory, setFoodCategory] = useState('burger');
    //const [activeFoodData, setActiveFoodData] = useState(new Array<FoodItem>());
    //const [isLoading, setIsLoading] = useState(false);
    //const {handleAddToCart, cartItems} = useReduxState();

    // useEffect(() => {
    //     setIsLoading(true);
    //      fetch(`https://....app/products/${foodCategory}`)
    //          .then(res => res.json())
    //          .then(data => {
    //              setActiveFoodData(data);
    //              setIsLoading(false);
    //          });
    //     setIsLoading(false);
    // }, [foodCategory]);

    const { data: foodItems } = useAppSelector(state => state.foodItems);
    const activeFoodData = foodItems;
    const { loadCollection } = useFireStore('foodItems');

    useEffect(() => {
        loadCollection(actions)
    }, [loadCollection])

    console.log('activeFoodData', activeFoodData);


    return (
        <section id='main-menu'>
            <header>
                <Container>
                    {/* <Navbar /> */}
                </Container>
            </header>

            <main>
                <Box sx={{
                    backgroundImage: `url(${bannerImage})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: '26rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Box sx={{ fontSize: '4rem', color: 'white', fontWeight: '500', textAlign: 'center' }} component='h5'>MAIN MENU</Box>
                </Box>

                <section id='main-menu-icons'>
                    <Container>
                        <Grid container sx={{ padding: '0 10%' }}>
                            <Grid item xs={6} sm={4} md={2}>
                                <Box
                                    className={foodCategory === 'burger' ? 'selectedBox' : ''}
                                    sx={{ textAlign: 'center', margin: '1rem', padding: "0.8rem", cursor: 'pointer' }}
                                    onClick={() => setFoodCategory('burger')}
                                >
                                    <img className='main-menu-icon-size' src={icons.burger} alt="" />
                                    <Box sx={{ fontSize: '1.125rem', fontWeight: '500' }}>BURGERS</Box>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <Box
                                    className={foodCategory === 'dessert' ? 'selectedBox' : ''}
                                    sx={{ textAlign: 'center', margin: '1rem', padding: "0.8rem", cursor: 'pointer' }}
                                    onClick={() => setFoodCategory('dessert')}
                                >
                                    <img className='main-menu-icon-size' src={icons.dessert} alt="" />
                                    <Box sx={{ fontSize: '1.125rem', fontWeight: '500' }}>DESSERT</Box>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <Box
                                    className={foodCategory === 'pasta' ? 'selectedBox' : ''}
                                    sx={{ textAlign: 'center', margin: '1rem', padding: "0.8rem", cursor: 'pointer' }}
                                    onClick={() => setFoodCategory('pasta')}
                                >
                                    <img className='main-menu-icon-size' src={icons.pasta} alt="" />
                                    <Box sx={{ fontSize: '1.125rem', fontWeight: '500' }}>PASTA</Box>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <Box
                                    className={foodCategory === 'pizza' ? 'selectedBox' : ''}
                                    sx={{ textAlign: 'center', margin: '1rem', padding: "0.8rem", cursor: 'pointer' }}
                                    onClick={() => setFoodCategory('pizza')}
                                >
                                    <img className='main-menu-icon-size' src={icons.pizza} alt="" />
                                    <Box sx={{ fontSize: '1.125rem', fontWeight: '500' }}>PIZZA</Box>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <Box
                                    className={foodCategory === 'salad' ? 'selectedBox' : ''}
                                    sx={{ textAlign: 'center', margin: '1rem', padding: "0.8rem", cursor: 'pointer' }}
                                    onClick={() => setFoodCategory('salad')}
                                >
                                    <img className='main-menu-icon-size' src={icons.salad} alt="" />
                                    <Box sx={{ fontSize: '1.125rem', fontWeight: '500' }}>SALAD</Box>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <Box
                                    className={foodCategory === 'sides' ? 'selectedBox' : ''}
                                    sx={{ textAlign: 'center', margin: '1rem', padding: "0.8rem", cursor: 'pointer' }}
                                    onClick={() => setFoodCategory('sides')}
                                >
                                    <img className='main-menu-icon-size' src={icons.fries} alt="" />
                                    <Box sx={{ fontSize: '1.125rem', fontWeight: '500' }}>SIDES</Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </section>

                <section id='food-item-grid'>
                    <Container>
                        {
                            // isLoading ? (
                            //     <LoadingSpinner />

                            // ) :
                            (
                                <Grid container spacing={3}>
                                    {
                                        activeFoodData.map(foodItem =>
                                            <ActiveFoodItem
                                                key={foodItem._id}
                                                foodItem={foodItem}
                                                cartItems={new Array<FoodItem>()}
                                                handleAddToCart={() => { }}
                                            //cartItems={cartItems}
                                            //handleAddToCart={handleAddToCart}
                                            />
                                        )
                                    }
                                </Grid>
                            )
                        }
                    </Container>
                </section>

                {/* <Delivery /> */}
            </main>

            <footer>
                {/* <Footer /> */}
            </footer>
        </section>
    );
};

export default MainMenu;