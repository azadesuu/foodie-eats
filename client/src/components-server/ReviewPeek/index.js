import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { getUserById } from "../../api";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

const ReviewPeek = props => {
  const navigate = useNavigate();
  const { _id, restaurantName, userID, rating, likeCount } = props.reviewData;
    // const { data: user, isLoading } = useQuery(
    //   "username-query",
    //   () => getUserById(),
    //   { enabled: !!userID }
    // );
    // change to queried username once database is updated
  const [username, setUsername] = useState(userID);

  function viewReview() {
    navigate(`/review/${_id}`);
  }

  return (
    <ThemeProvider theme={theme}>   
        <List sx={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
        }}>
            <ListItemButton 
                href="#"
                alignItems="flex-start" 
                sx={{ 
                    width: '95%', 
                    bgcolor: 'background.white', 
                    borderRadius: '10px',
                    marginRight: '10px',
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
                                    Date visited: 01/01/22
                                </Typography>
                                <Typography 
                                    variant="body2"
                                    display="inline"
                                    fontSize="10px"
                                    fontFamily="Martel Sans">
                                    By {username}
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
                                    {restaurantName}
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
                                        {likeCount}
                                    </Typography> 
                                </div> 
                            </div>  
                        </React.Fragment>
                    }
                    secondary={
                        <React.Fragment>
                            <Rating name="read-only" value={rating} size="small" readOnly />
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
  );
};

export default ReviewPeek;
