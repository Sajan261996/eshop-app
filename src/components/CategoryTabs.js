import React from "react";
import { Box } from "@mui/material";
import { ToggleButton, ToggleButtonGroup, styled } from "@mui/material";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    display: 'flex',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: theme.spacing(2),
    justifyContent: 'center',
    height: '40px', // Fixed height
    alignItems: 'center',
    '& .MuiToggleButton-root': {
        textTransform: "uppercase",
        color: '#888',
        borderColor: '#ccc',
        padding: '6px 10px',
        fontSize: '0.9rem',
        borderRight: '1px solid #ccc',
        '&:last-of-type': {
            borderRight: 'none',
        },
        '&.Mui-selected': {
            backgroundColor: '#eee',
            color: '#333',
            fontWeight: 500,
        },
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
        '&:first-of-type': {
            borderLeft: '1px solid #ccc',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
        },
        '&:last-of-type': {
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
        }
    },
}));

const CategoryTabs = ({ setCategory, selectedCategory }) => {
    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            if (setCategory && typeof setCategory === "function") {
                setCategory(newAlignment);
            } else {
                console.error("setCategory is not a function or undefined.");
            }
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <StyledToggleButtonGroup
                value={selectedCategory}
                exclusive
                onChange={handleAlignment}
                aria-label="category selection"
            >
                <ToggleButton value="all" aria-label="all categories">
                    All
                </ToggleButton>
                <ToggleButton value="apparel" aria-label="apparel">
                    Apparel
                </ToggleButton>
                <ToggleButton value="electronics" aria-label="electronics">
                    Electronics
                </ToggleButton>
                <ToggleButton value="personal care" aria-label="personal care">
                    Personal Care
                </ToggleButton>
            </StyledToggleButtonGroup>
        </Box>
    );
};

export default CategoryTabs;