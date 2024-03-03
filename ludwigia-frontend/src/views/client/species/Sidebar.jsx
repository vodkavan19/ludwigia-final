import { Link as LinkScroll } from 'react-scroll'

import Box from '@mui/material/Box';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

function SpeciesSidebar() {
    return (
        <Box bgcolor='background.accent2'>
            <Box width='198px' position='sticky' top={0}>
                <MenuList
                    sx={{
                        '& a.active li': {
                            bgcolor: 'background.active2',
                            transition: 'all 200ms ease-in-out'
                        }
                    }}
                >
                    <LinkScroll to='intro' spy={true} smooth={true} offset={-120} duration={1000}>
                        <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                            Giới thiệu
                        </MenuItem>
                    </LinkScroll>
                    <LinkScroll to='description' spy={true} smooth={true} offset={2} duration={1000}>
                        <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                            Mô tả
                        </MenuItem>
                    </LinkScroll>
                    <LinkScroll to='microsurgery' spy={true} smooth={true} offset={2} duration={1000}>
                        <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                            Vi phẩu
                        </MenuItem>
                    </LinkScroll>
                    <LinkScroll to='distribution' spy={true} smooth={true} offset={2} duration={1000}>
                        <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                            Phân bố sinh thái
                        </MenuItem>
                    </LinkScroll>
                    <LinkScroll to='phytochemicals' spy={true} smooth={true} offset={2} duration={1000}>
                        <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                            Hóa thực vật và hoạt tính sinh học
                        </MenuItem>
                    </LinkScroll>
                    <LinkScroll to='used-parts' spy={true} smooth={true} offset={2} duration={1000}>
                        <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                            Bộ phận dùng và công dụng
                        </MenuItem>
                    </LinkScroll>
                    <LinkScroll to='references' spy={true} smooth={true} offset={2} duration={1000}>
                        <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                            Tài liệu tham khảo
                        </MenuItem>
                    </LinkScroll>
                </MenuList>
            </Box>
        </Box>
    );
}

export default SpeciesSidebar;