import React from "react"; // required
import "./index.css";

import "@fontsource/martel-sans";

import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PostAddIcon from '@mui/icons-material/PostAdd';

import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavLoggedIn from "../LoggedInNavBar";

function Title() {
    return (
        <div>
            <h1>COMMUNITY</h1>
        </div>
    );
}

function Location() {
    return (
        <div className="location">
            <LocationOnIcon />
            <input
                type="text"
                placeholder="Select your postcode here"
                name="location"
                id="location"
                // value="3000 Melbourne, Australia"
                required
            />
        </div>
    )
}

function SearchBar() {
    const data = [{"Name": "Calia", "Author": "abcd123"}, {"Name": "David's Hotpot", "Author": "xyz789"}]
    return (
        <div className="searchbar">
            <div className="searchrow">
                <SearchIcon />
                <input
                    type="text"
                    placeholder="Search"
                    name="search"
                    id="search"
                    // value="{{search}}"
                    required
                />
                <FilterAltIcon />
            </div>
            <div className="searchResult">

            </div>
        </div>
    )
}

const theme = createTheme({
    palette: {
        background: {
            green: "#BEE5B0",
            grey: "#ECE7E5",
            white: "#FFFCFB"
        },
        text: {
            main: "#000000"
        },
        img: {
            main: "#000000"
        }
    }
});

function TopRecom() {
    const filter_fields = ['rating', 'price range'];

    return (
        <div className="toprecom">
            <h2>TOP RECOMMENDATIONS</h2>
            <span className="smallScreen">
                <div className="toprecom-content">
                    <ThemeProvider theme={theme}>   
                        <List sx={{ 
                                width: '100%', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                overflowY: 'auto',
                                maxHeight: "200px", 
                                flexDirection: "column",
                                "&::-webkit-scrollbar": {
                                    width: '0.3em',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#FFFEEC',
                                    borderRadius: '10px',
                                    maxHeight: '4px',
                                }
                        }}>
                            {/* // loop here */}
                            <ListItemButton 
                                href="#"
                                alignItems="flex-start" 
                                sx={{ 
                                    width: '95%', 
                                    marginTop: '40px',
                                    bgcolor: 'background.white', 
                                    borderRadius: '10px',
                                    "&:hover": { bgcolor: 'white'}
                                }}>
                                <ListItemText sx={{ margin: '-7px' }}
                                    primary={
                                        <React.Fragment>
                                            <div className="t1">
                                                <Typography 
                                                    variant="body2"
                                                    display="inline"
                                                    fontSize="10px"
                                                    fontFamily="Martel Sans">
                                                    Date visited: 01/01/22
                                                </Typography>
                                                <Typography 
                                                    variant="body2"
                                                    display="inline"
                                                    fontSize="10px"
                                                    fontFamily="Martel Sans">
                                                    By abcd123
                                                </Typography>
                                            </div>
                                            <div className="line2"></div>
                                            <div className="t2">
                                                <Typography 
                                                    variant="h5"
                                                    fontSize="15px"
                                                    fontFamily="Martel Sans"
                                                    display="inline"
                                                    >
                                                    Calia
                                                </Typography>
                                                <div className="like">
                                                    <ThumbUpIcon sx={{ fontSize: 15 }}/>
                                                    <Typography
                                                        variant="body2"
                                                        fontSize="10px"
                                                        fontFamily="Martel Sans"
                                                        display="inline"
                                                        mt="1px"
                                                        >
                                                        10k
                                                    </Typography> 
                                                </div> 
                                            </div>  
                                        </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Rating name="read-only" value="4" size="small" readOnly />
                                            <Typography
                                                variant="body2"
                                                fontSize="10px"
                                                fontFamily="Martel Sans"
                                                >
                                                So delicious! I will definitely visit again, Lorem ipsum dolor sit amet,
                                                consectetur adipiscing...
                                                <a href="#" id="link">Read More</a>
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                fontSize="10px"
                                                fontFamily="Martel Sans"
                                                display="flex"
                                                justifyContent="flex-end"
                                                >
                                                +2 images
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItemButton>
                            <div className="line3"></div>
                            <ListItemButton 
                                href="#"
                                alignItems="flex-start" 
                                sx={{ 
                                    width: '95%', 
                                    bgcolor: 'background.white', 
                                    borderRadius: '10px',
                                    "&:hover": { bgcolor: 'white'},
                                    "&::-webkit-scrollbar": {
                                        width: '0.3em',
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: '#FFFEEC',
                                        borderRadius: '10px',
                                        maxHeight: '4px',
                                    }
                                }}>
                                <ListItemText sx={{ margin: '-7px' }}
                                    primary={
                                        <React.Fragment>
                                            <div className="t1">
                                                <Typography 
                                                    variant="body2"
                                                    display="inline"
                                                    fontSize="10px"
                                                    fontFamily="Martel Sans">
                                                    Date visited: 01/01/22
                                                </Typography>
                                                <Typography 
                                                    variant="body2"
                                                    display="inline"
                                                    fontSize="10px"
                                                    fontFamily="Martel Sans">
                                                    By abcd123
                                                </Typography>
                                            </div>
                                            <div className="line2"></div>
                                            <div className="t2">
                                                <Typography 
                                                    variant="h5"
                                                    fontSize="15px"
                                                    fontFamily="Martel Sans"
                                                    display="inline"
                                                    >
                                                    Calia
                                                </Typography>
                                                <div className="like">
                                                    <ThumbUpIcon sx={{ fontSize: 15 }}/>
                                                    <Typography
                                                        variant="body2"
                                                        fontSize="10px"
                                                        fontFamily="Martel Sans"
                                                        display="inline"
                                                        mt="1px"
                                                        >
                                                        10k
                                                    </Typography> 
                                                </div> 
                                            </div>  
                                        </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Rating name="read-only" value="4" size="small" readOnly />
                                            <Typography
                                                variant="body2"
                                                fontSize="10px"
                                                fontFamily="Martel Sans"
                                                >
                                                So delicious! I will definitely visit again, Lorem ipsum dolor sit amet,
                                                consectetur adipiscing...
                                                <a href="#" id="link">Read More</a>
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                fontSize="10px"
                                                fontFamily="Martel Sans"
                                                display="flex"
                                                justifyContent="flex-end"
                                                >
                                                +2 images
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItemButton>
                        </List>
                    </ThemeProvider>
                </div>
            </span>
            <span className="bigScreen">
            <Box sx={{ 
                flexGrow: 1, 
                overflowY: 'auto', 
                maxHeight:  "200px",
                padding: '1%',
                "&::-webkit-scrollbar": {
                    width: '0.3em',
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: '#BEE5B0',
                    borderRadius: '10px',
                }
            }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(Array(10)).map((_, index) => (
                    // loop here
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <ThemeProvider theme={theme}>   
                            <List sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <ListItemButton 
                                    href="#"
                                    alignItems="flex-start" 
                                    sx={{ 
                                        width: '95%', 
                                        bgcolor: 'background.white', 
                                        borderRadius: '10px',
                                        boxShadow: '0 5px 5px rgba(0, 0, 0, 0.25)',
                                        "&:hover": { bgcolor: 'white'},
                                }}>
                                    <ListItemText sx={{ margin: '-7px' }}
                                        primary={
                                            <React.Fragment>
                                                <div className="t1">
                                                    <Typography 
                                                        variant="body2"
                                                        display="inline"
                                                        fontSize="10px"
                                                        fontFamily="Martel Sans">
                                                        Date visited: 01/01/22
                                                    </Typography>
                                                    <Typography 
                                                        variant="body2"
                                                        display="inline"
                                                        fontSize="10px"
                                                        fontFamily="Martel Sans">
                                                        By abcd123
                                                    </Typography>
                                                </div>
                                                <div className="line2"></div>
                                                <div className="t2">
                                                    <Typography 
                                                        variant="h5"
                                                        fontSize="15px"
                                                        fontFamily="Martel Sans"
                                                        display="inline"
                                                        >
                                                        Calia
                                                    </Typography>
                                                    <div className="like">
                                                        <ThumbUpIcon sx={{ fontSize: 15 }}/>
                                                        <Typography
                                                            variant="body2"
                                                            fontSize="10px"
                                                            fontFamily="Martel Sans"
                                                            display="inline"
                                                            mt="1px"
                                                            >
                                                            10k
                                                        </Typography> 
                                                    </div> 
                                                </div>  
                                            </React.Fragment>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Rating name="read-only" value="4" size="small" readOnly />
                                                <Typography
                                                    variant="body2"
                                                    fontSize="10px"
                                                    fontFamily="Martel Sans"
                                                    >
                                                    So delicious! I will definitely visit again, Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing...
                                                    <a href="#" id="link">Read More</a>
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    fontSize="10px"
                                                    fontFamily="Martel Sans"
                                                    display="flex"
                                                    justifyContent="flex-end"
                                                    >
                                                    +2 images
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItemButton>
                            </List>
                        </ThemeProvider>
                    </Grid>
                    ))}
                </Grid>
            </Box>
            </span>
        </div>
    )
}

function Recent() {
    return (
        <div className="recent">
            <h2>RECENT</h2>
            <span className="smallScreen">
                <div className="recent-content">
                    <ThemeProvider theme={theme}>   
                        <List sx={{ 
                            width: '100%', 
                            display: 'flex', 
                            justifyContent: 'center',
                            overflowY: 'auto',
                            maxHeight: "200px", 
                            flexDirection: "column",
                            "&::-webkit-scrollbar": {
                                width: '0.3em',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#FFFEEC',
                                borderRadius: '10px',
                                maxHeight: '4px',
                            }
                        }}>
                            <ListItemButton 
                                href="#"
                                alignItems="flex-start" 
                                sx={{ 
                                    width: '95%', 
                                    bgcolor: 'background.white', 
                                    borderRadius: '10px',
                                    marginLeft: '5px',
                                    "&:hover": { bgcolor: 'white'}
                                }}>
                                <ListItemText sx={{ margin: '-7px' }}
                                    primary={
                                        <React.Fragment>
                                            <div className="t1">
                                                <Typography 
                                                    variant="body2"
                                                    display="inline"
                                                    fontSize="10px"
                                                    fontFamily="Martel Sans">
                                                    Date visited: 08/01/22
                                                </Typography>
                                                <Typography 
                                                    variant="body2"
                                                    display="inline"
                                                    fontSize="10px"
                                                    fontFamily="Martel Sans">
                                                    By xyz789
                                                </Typography>
                                            </div>
                                            <div className="line2"></div>
                                            <div className="t2">
                                                <Typography 
                                                    variant="h5"
                                                    fontSize="15px"
                                                    fontFamily="Martel Sans"
                                                    display="inline"
                                                    >
                                                    David's Hotpot
                                                </Typography>
                                                <div className="like">
                                                    <ThumbUpIcon sx={{ fontSize: 15 }}/>
                                                    <Typography
                                                        variant="body2"
                                                        fontSize="10px"
                                                        fontFamily="Martel Sans"
                                                        display="inline"
                                                        mt="1px"
                                                        >
                                                        0
                                                    </Typography> 
                                                </div> 
                                            </div>  
                                        </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Rating name="read-only" value="5" size="small" readOnly />
                                            <Typography
                                                variant="body2"
                                                fontSize="10px"
                                                fontFamily="Martel Sans"
                                                >
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                                Phasellus convallis,...
                                                <a href="#" id="link">Read More</a>
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                fontSize="10px"
                                                fontFamily="Martel Sans"
                                                display="flex"
                                                justifyContent="flex-end"
                                                >
                                                +1 images
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItemButton>
                        </List>
                    </ThemeProvider>
                    <div className="line3"></div>
                </div>
            </span>
            <span className="bigScreen">
            <Box sx={{ 
                flexGrow: 1, 
                overflowY: 'auto', 
                maxHeight:  "200px",
                padding: '1%',
                "&::-webkit-scrollbar": {
                    width: '0.3em',
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: '#BEE5B0',
                    borderRadius: '10px',
                }
            }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(Array(10)).map((_, index) => (
                    // loop here
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <ThemeProvider theme={theme}>   
                            <List sx={{ 
                                width: '100%', 
                                display: 'flex', 
                                justifyContent: 'center',
                                overflowY: 'auto',
                                maxHeight: "200px", 
                                flexDirection: "column",
                                "&::-webkit-scrollbar": {
                                    width: '0.3em',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#FFFEEC',
                                    borderRadius: '10px',
                                    maxHeight: '4px',
                                }
                            }}>
                                <ListItemButton 
                                    href="#"
                                    alignItems="flex-start" 
                                    sx={{ 
                                        width: '95%', 
                                        bgcolor: 'background.white', 
                                        borderRadius: '10px',
                                        boxShadow: '0 5px 5px rgba(0, 0, 0, 0.25)',
                                        "&:hover": { bgcolor: 'white'}
                                    }}>
                                    <ListItemText sx={{ margin: '-7px' }}
                                        primary={
                                            <React.Fragment>
                                                <div className="t1">
                                                    <Typography 
                                                        variant="body2"
                                                        display="inline"
                                                        fontSize="10px"
                                                        fontFamily="Martel Sans">
                                                        Date visited: 08/01/22
                                                    </Typography>
                                                    <Typography 
                                                        variant="body2"
                                                        display="inline"
                                                        fontSize="10px"
                                                        fontFamily="Martel Sans">
                                                        By xyz789
                                                    </Typography>
                                                </div>
                                                <div className="line2"></div>
                                                <div className="t2">
                                                    <Typography 
                                                        variant="h5"
                                                        fontSize="15px"
                                                        fontFamily="Martel Sans"
                                                        display="inline"
                                                        >
                                                        David's Hotpot
                                                    </Typography>
                                                    <div className="like">
                                                        <ThumbUpIcon sx={{ fontSize: 15 }}/>
                                                        <Typography
                                                            variant="body2"
                                                            fontSize="10px"
                                                            fontFamily="Martel Sans"
                                                            display="inline"
                                                            mt="1px"
                                                            >
                                                            0
                                                        </Typography> 
                                                    </div> 
                                                </div>  
                                            </React.Fragment>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Rating name="read-only" value="5" size="small" readOnly />
                                                <Typography
                                                    variant="body2"
                                                    fontSize="10px"
                                                    fontFamily="Martel Sans"
                                                    >
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                                    Phasellus convallis,...
                                                    <a href="#" id="link">Read More</a>
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    fontSize="10px"
                                                    fontFamily="Martel Sans"
                                                    display="flex"
                                                    justifyContent="flex-end"
                                                    >
                                                    +1 images
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItemButton>
                            </List>
                        </ThemeProvider>
                    </Grid>
                    ))}
                </Grid>
            </Box>
            </span>
        </div>
    )
}

function Post() {
    return(
        <div className="postButton">
            <span className="smallScreen">
                <IconButton href='#'>
                    <PostAddIcon 
                        sx={{
                            bgcolor: "#BEE5B0",
                            color: "white",
                            borderRadius: "30px",
                            fontSize: 50,
                            position: "fixed",
                            bottom: "40px",
                            padding: "2px"
                        }}
                    />
                </IconButton>
            </span>
        </div>
    )
}

function Community() {
    return (
        <div className="content">
            {/* if logged in */}
            <NavLoggedIn />
            {/* else */}
            {/* <Nav /> */}
            <span className="bigScreen">
                <Location />
            </span>
            <Title />
            <span className="smallScreen">
                <Location />
            </span>
            <SearchBar />
            <div className="line" />
            <TopRecom />
            <div className="line" />
            <Recent />
            <Post />
            <div className="footer">
                <p>copyright © 2022 All-for-one</p>
            </div>  
        </div>
    )
}

export default Community;