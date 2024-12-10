import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import Slider from "react-slick"; // Carousel library

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  height: "400px",
  backgroundImage: `url('https://images.unsplash.com/photo-1607189403190-44bcd6036d8c')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textAlign: "center",
  padding: theme.spacing(4),
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 2),
  textAlign: "center",
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: "#FF69B4",
  color: "white",
  textAlign: "center",
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

const Homepage = () => {
  // Settings for react-slick carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const galleryImages = [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    "https://images.unsplash.com/photo-1604152135912-04a8232389b7",
    "https://images.unsplash.com/photo-1556910103-1e01c439dc36",
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Welcome to Pastry Paradise
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Indulge in Sweet Delights
        </Typography>
      </HeroSection>

      {/* Image Gallery Carousel */}
      <Section>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Our Creations
        </Typography>
        <Container maxWidth="md">
          <Slider {...carouselSettings}>
            {galleryImages.map((url, index) => (
              <Box key={index}>
                <img
                  src={url}
                  alt={`Gallery Image ${index + 1}`}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Box>
            ))}
          </Slider>
        </Container>
      </Section>

      {/* Footer */}
      <Footer>
        <Typography variant="body2">
          © 2024 Pastry Paradise. All rights reserved.
        </Typography>
      </Footer>
    </Box>
  );
};

export default Homepage;
