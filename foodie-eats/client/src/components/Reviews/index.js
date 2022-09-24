import React from "react"; // required
import "./index.css";

import "@fontsource/martel-sans";

import NavLoggedIn from "../LoggedInNavBar";

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

function Title() {
    return (
        <div>
            <h1>MY REVIEWS</h1>
        </div>
    );
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

function Reviews() {
    const lst = [];

    for (let i=0; i < 10; i++) {
        lst.push(
            <List sx={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                flexDirection: 'column'
                }}>
                <ListItemButton 
                    href="#"
                    alignItems="flex-start" 
                    sx={{ 
                        width: '95%', 
                        marginLeft: '5px',
                        bgcolor: 'background.white', 
                        borderRadius: '10px',
                        border: '1px solid #000000',
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
            </List>
        );
    }
    return (
        <div className="reviews">
            <div className="reviews-content">
                <ThemeProvider theme={theme}>
                    <List sx={{overflowY: 'auto',
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
                    {lst}
                </List>
                </ThemeProvider>
            </div>
        </div>
    )

}

function MyReviews() {
    return (
        <div className="content">
            <NavLoggedIn />
            <Title />
            <SearchBar />
            <div className="line" />
            <Reviews />
            <Post />
            <div className="footer">
                <p>copyright © 2022 All-for-one</p>
            </div>  
        </div>
    )
}

export default MyReviews;