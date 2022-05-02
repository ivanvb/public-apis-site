import React from 'react';
import { Box, MenuList, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@emotion/react';

const FilterAccordion = function ({ title, selectedItems, children }) {
    const theme = useTheme();
    const badgeSize = theme.spacing(2.5);

    return (
        <Accordion
            sx={{
                '&::before': {
                    display: 'none',
                },
                boxShadow: '0',
            }}
            disableGutters
        >
            <AccordionSummary
                sx={{
                    my: 0,
                    px: 3,
                    '&.Mui-expanded': {
                        my: 0,
                        py: 0,
                        minHeight: theme.spacing(6),
                    },
                    '.MuiAccordionSummary-content': {
                        alignItems: 'center',
                    },
                    display: 'flex',
                }}
                expandIcon={<KeyboardArrowDownIcon />}
            >
                {title}
                {selectedItems > 0 && (
                    <Box
                        sx={{
                            height: badgeSize,
                            width: badgeSize,
                            background: theme.palette.primary.main,
                            borderRadius: '100%',
                            color: theme.palette.primary.contrastText,
                            textAlign: 'center',
                            marginLeft: 1,
                            fontSize: 12,
                            lineHeight: badgeSize,
                        }}
                    >
                        {selectedItems}
                    </Box>
                )}
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, background: theme.palette.tertiary.main }}>
                <MenuList>{children}</MenuList>
            </AccordionDetails>
        </Accordion>
    );
};

export default FilterAccordion;
