SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `demo_clientes`
--

-- --------------------------------------------------------

--
-- Stable structure `clientes`
--

CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `direccion` text,
  `email` varchar(200),
  `cif` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `direccion`, `email`, `cif`) VALUES
(1, 'Raúl Polanco Montiel', 'Paseo Arco de Ladrillo 74', 'rapomon@gmail.com', '12345678Z'),
(2, 'Cliente 2', 'Plaza Mayor, Valladolid', 'cliente2@gmail.com', '12345678Z'),
(3, 'Cliente 3', 'Acera Recoletos', 'cliente3@gmail.com', '12345678Z'),
(4, 'Cliente 4', 'Paseo Zorrilla', 'cliente4@gmail.com', '12345678Z'),
(5, 'Cliente 5', 'Paseo Farnesio', 'cliente5@gmail.com', '12345678Z');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
