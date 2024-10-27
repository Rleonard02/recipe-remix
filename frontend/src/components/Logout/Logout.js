import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";

import "./logout.css"

const Logout = ({ closeModal }) => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const handleLogoutClick = () => {
        // Logout logic
        dispatch(setLogout());
        Navigate("/");
    };

    const exitModal = () => {
        closeModal();  // Call the closeModal function passed as a prop
    }
    
    return (
        <div className="logout-modal">
            <div className="logout-confirmation">
                <h3>Are you sure you want to logout?</h3>
            </div>
            <div className="logout-buttons">
                <Button 
                    onClick={exitModal}
                    variant="contained"
                    sx={{
                        backgroundColor: "#fff",
                        color: "#3c4043",
                        borderRadius: "24px",
                        padding: "12px 30px",
                        fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
                        fontSize: "14px",
                        fontWeight: 500,
                        textTransform: "none",
                        boxShadow: "rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px",
                        "&:hover": {
                            backgroundColor: "#f1f3f4",
                            boxShadow: "rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px",
                        },
                        "&:active": {
                            boxShadow: "0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%)",
                        },
                        "&:focus": {
                            borderColor: "#4285f4",
                            boxShadow: "rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px",
                        },
                        "&.Mui-disabled": {
                            boxShadow: "rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px",
                        },
                        mr: 2, // Add margin to the right of the button
                    }}
                >
                    Cancel
                </Button>

                <Button 
                    onClick={handleLogoutClick} 
                    variant="contained"
                    sx={{
                        backgroundColor: "#FA7070",
                        color: "#ffffff",
                        borderRadius: "24px",
                        padding: "12px 24px",
                        fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
                        fontSize: "14px",
                        fontWeight: 500,
                        textTransform: "none",
                        boxShadow: "rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px",
                        "&:hover": {
                            backgroundColor: "#bc5050",
                            boxShadow: "rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px",
                        },
                        "&:active": {
                            boxShadow: "0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%)",
                        },
                        "&:focus": {
                            borderColor: "#4285f4",
                            boxShadow: "rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px",
                        },
                        "&.Mui-disabled": {
                            boxShadow: "rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px",
                        },
                    }}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Logout;
