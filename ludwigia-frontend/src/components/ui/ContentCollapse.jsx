import { ArrowDownward } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function ContentCollapse({ children, sx }) {
  const containerRef = useRef(null)
  const collapseHeight = window.innerHeight * 0.75;
  const [collapse, setCollapse] = useState(false)

  useEffect(() => {
    var realHeight = containerRef.current.clientHeight;
    if(realHeight > collapseHeight) {
      setCollapse(true)
    } else {
      setCollapse(false)
    }
  }, [children])

  return (  
    <Box 
      ref={containerRef} 
      sx={sx} position='relative' overflow='hidden'
      maxHeight={collapse ? '75vh' : 'unset'}
    >
      {children}
      {collapse && (
        <Box 
          position='absolute' bottom={0} right={0} left={0} height='75%'
          textAlign='center' pt='45%'
          sx={{  
            background: 'linear-gradient(to top, #fffc, transparent)'
          }}
        >
          <Button 
            startIcon={<ArrowDownward />} 
            variant="contained" size='small' disableElevation
            sx={{ backgroundColor: '#00ab55bf' }}
            onClick={() => setCollapse(false)}
          >
            Xem thêm
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ContentCollapse;