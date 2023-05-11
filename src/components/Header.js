import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: jasonkobes24@gmail.com",
  },
  {
    icon: faGithub,
    url: "https://github.com/JSchwartz24",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/jasonkschwartz/",
  },
  // {
  //   icon: faMedium,
  //   url: "https://medium.com",
  // },
  // {
  //   icon: faStackOverflow,
  //   url: "https://stackoverflow.com",
  // },
];

const Header = () => {
  const prevPosition = useRef(window.scrollY);
  const[transform, setTransform] = useState(null);

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const handleScroll = (e) => {
      const currentPosition = window.pageYOffset;

      if(prevPosition.current > currentPosition){
        setTransform("translateY(0)");
      }
      else{
        setTransform("translateY(-200px)");
      }
      prevPosition.current = currentPosition;
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      transform={transform}
      transitionProperty="transform"
      transitionDuration=".4s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"

      style={{zIndex:2}} //to fix contact section from going over header
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={8}>
              {socials.map(({icon, url}) => (
                <a
                  key = {url}
                  href = {url}
                  target = "_blank"
                  rel = "noopener noreferrer"
                >
                  <FontAwesomeIcon icon={icon} size="2x" key = {url}/>
                </a>
              ))}
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              <a href="#projects" onClick={handleClick("projects")} style={{cursor:'pointer'}}>
                Projects
              </a>
              <a href="#contactme" onClick={handleClick("contactme")} style={{cursor:'pointer'}}>
                Contact Me
              </a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
