import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import orange from '@mui/material/colors/orange';
import teal from '@mui/material/colors/teal';

import fullBanner from '~/assets/images/intro/fullwidth.jpeg';
import imgContent1 from '~/assets/images/intro/intro-page1.jpg';
import imgContent2 from '~/assets/images/intro/intro-page2.jpg';
import imgContent3 from '~/assets/images/intro/intro-page3.jpg';
import imgContent4 from '~/assets/images/intro/intro-page4.jpg';

const contents = [
    {
        image: imgContent1,
        content: 'Ở Việt Nam, chi Ludwigia (chi rau mương) hiện biết có khoảng 6 loài phân bố rải rác khắp cả nước, gồm có L. octovalvis (rau mương lớn), L. repens (rau mương hoa nhỏ), L. hyssopifolia (rau mương thon), L. epilobioides (rau mương hẹp), L. prostrata (rau mương đất), L. adscendens (rau dừa nước).',
    },
    {
        image: imgContent2,
        content: 'Theo y học cổ truyền, có nhiều bài thuốc dùng các cây thuộc chi Ludwigia để điều trị cho người bệnh như: L. octovalvis được dùng chữa táo bón, lợi tiểu, chữa giun sán, hạ sốt, chữa vết thương; L. adscendens được dùng chữa cảm sốt, ho khan, phù thũng, lỵ ra máu; L. hysopifolia được dùng chữa kiết lỵ, tiêu chảy, viêm ruột, ho, cảm mạo, viêm họng và mụn nhọt.',
    },
    {
        image: imgContent3,
        content: 'Nhằm thúc đẩy nghiên cứu về những loài dược liệu thuộc chi Ludwigia, chúng tôi xây dựng website cung cấp cơ sở dữ liệu về hóa thực vật và hoạt tính sinh học của 6 loài thuộc chi Ludwigia ở Việt Nam. Website hứa hẹn cung cấp những thông tin có tính cập nhật, đầy đủ, chi tiết và đảm bảo tính chính xác của thông tin nhầm phục vụ cho việc nghiên cứu và ứng dụng của các dược liệu thuộc chi Ludwigia.',
    },
    {
        image: imgContent4,
        content: 'Ở Việt Nam, Ludwigia adscendens (rau dừa nước) có thể gặp ở hầu hết các địa phương thuộc vùng đồng bằng trung du và miền núi thấp, cây thường mọc ở nơi đất ngập nước (ao, đầm, bờ rượng ẩm ướt). Nếu mọc ở nơi nước nông như ở ruộng nước, vũng lầy cây mọc thẳng. Khi nước dâng cao hay ở môi trường nước sâu như ao, hồ, kênh mương, cây nổi trên mặt nước nhờ hệ thống rễ phụ biến thành phao xốp. Rau dừa nước ra hoa quả hàng năm. Quả nang khi già sẽ tự mở, hạt phát tán nhờ nước. Vào mùa xuân hè, khi cây bị cắt, phần còn lại mọc ra nhiều chồi',
    }
]

function IntroPage() {
    return (
        <Box>
            <Box position='relative'>
                <Box 
                    component='img' src={fullBanner} alt=''
                    width='100%' height={650} overflow='hidden'
                    sx={{ objectFit: 'cover', objectPosition: '50% 50%' }}
                />
                <Box 
                    position='absolute' 
                    top={0} left={0} right={0} bottom={0}
                    className='flex-center' flexDirection='column'
                >
                    <Typography 
                        variant='h1' color='white' align='center'
                        fontSize='9rem' fontWeight='bolder' fontStyle='italic'
                        fontFamily='var(--signika-font)' textTransform='uppercase'
                    >
                        Ludwigia
                    </Typography>
                    <Typography variant='h6' color='white' align='center' fontWeight={600} >
                        Tra cứu khoa học - Thông tin tin cậy - Tham khảo dễ dàng
                    </Typography>
                </Box>
            </Box>
            <Container maxWidth='lg' sx={{ mt: 6 }}>
                {contents.map((item, idx) => {
                    const accent1 = teal[800];
                    const accent2 = orange[500];
                    return (
                    <Box 
                        key={idx} display='flex' alignItems='center'  py={6}
                        flexDirection={(idx % 2 === 0) ? 'row' : 'row-reverse'} 
                    >
                        <Box 
                            component='img' src={item.image}
                            width='33%' height={'100%'} sx={{ aspectRatio: 4/3, objectFit: 'cover' }}  
                            boxShadow={(idx % 2 === 0) 
                                ? `1px 1px 0px 4px ${accent1}, 8px 8px 0px 4px ${accent2}`
                                : `-1px 1px 0px 4px  ${accent2}, -8px 8px 0px 4px  ${accent1}`
                            }
                        />
                        <Divider 
                            orientation="vertical" variant="middle" flexItem 
                            sx={{ 
                                borderRightWidth: 16, 
                                borderColor: (idx % 2 === 0) ? accent1 : accent2,
                                mr: (idx % 2 === 0) ? 4 : 8, 
                                ml: (idx % 2 === 0) ? 8 : 4, 
                            }}
                        />
                        <Typography variant='subtitle1' fontStyle='italic' align='justify' sx={{ textIndent: 40 }}>
                            {item.content}
                        </Typography>
                    </Box>
                    )
                })}
            </Container>
        </Box>
    );
}

export default IntroPage;