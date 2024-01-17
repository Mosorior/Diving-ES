// data.js
const diveSpots = [
  // Tarifa
    {
      id: 1,
      name: 'Pecio San Andrés',
      description: 'Explora la historia bajo el mar al bucear en el Pecio San Andrés en Tarifa, un naufragio que alberga secretos marinos y una experiencia inolvidable.',
      lat: 36.001588,
      lng: -5.607186,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Pecio San Andrés',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 2,
      name: 'Puerto Fenicio',
      description: 'La cita con las Tembladeras y los grandes bancos de caballas no falta en esta inmersión. Y si eres observador, podrás encontrarte con varias especies de rayas posadas o camufladas bajo la arena.',
      lat: 36.006471,
      lng: -5.610685,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Puerto Fenicio',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 3,
      name: 'La Garita 1',
      description: ' Busca entre el sinfín de piedras y recovecos la vida que esconde: bogavantes, cangrejos ermitaños, pulpos curiosos, tembladeras camufladas, cientos de nudibranquios… entre preciosos bancos de peces diferentes, como el Tres Colas.',
      lat: 36.005436,
      lng: -5.608466,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'La Garita 1',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 19,
      name: 'La Garita 2',
      description: 'El paso por el cabo, ya sea a la ida o a la vuelta, nos ofrece una zona rocosa espectacular, con derrumbes y recovecos que suelen albergar pulpos, brótolas, morenas, centollos y gran cantidad de vida pequeña.',
      lat: 36.004492,
      lng: -5.605943,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'La Garita 2',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 20,
      name: 'Las Piscinas',
      description: 'Podrás encontrar infinidad de nudibranquios, entre los que no faltará la famosa «Vaquita Suiza». También grandes bancos de peces entre los que se pierde alguna familia de Dentones y morenas en sus rincones.',
      lat: 36.003114,
      lng: -5.606602,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Las Piscinas',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 21,
      name: 'Punta Marroquí de Levante',
      description: 'En el fondo encontraremos muchísima vida, nadando libremente o escondida en las oquedades, todo tapizado por el precioso coral naranja de la Isla de Tarifa.',
      lat: 36.000595,
      lng: -5.608034,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Punta Marroquí de Levante',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 22,
      name: 'Punta Marroquí de Poniente',
      description: 'Es una de las zonas más ricas de la Isla de Tarifa en lo que a biodiversidad marina se refiere, entre otras cosas, por las corrientes.',
      lat: 36.000000,
      lng: -5.611477,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Punta Marroquí de Poniente',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 23,
      name: 'Las Calderas',
      description: 'En el fondo se hallan hasta tres calderas de diferentes pecios que le dan nombre a la inmersión. Junto a estas, yacen los restos, bastante deteriorados de un barco de vapor que alberga un sinfín de vida.',
      lat: 36.001512,
      lng: -5.612501,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Las Calderas',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 24,
      name: 'Las Calles',
      description: 'Grandes y altos bloques de piedras enfrentados que conforman pasillos en los que resguardarse de la corriente y descubrir la vida típica de la Isla de Tarifa.',
      lat: 36.002601,
      lng: -5.613062,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Las Calles',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 25,
      name: 'Los Pasillos',
      description: 'Esta inmersión sorprende por la irregularidad del terreno, ya que las rocas forman verdaderos pasadizos o caminos que nos permiten recorrer la zona entre grandes bloques de piedra.',
      lat: 36.003977,
      lng: -5.613714,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Los Pasillos',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 26,
      name: 'Pecio las Gorgonias',
      description: 'Barco de vapor sueco de finales del XIX. En los años veinte, mientras navegaba frente a las costas tarifeñas en una travesía de carga, su casco colisionó con el Bajo de los Cabezos y rápidamente se fue a pique frente a la Playa de los Lances.',
      lat: 36.006284,
      lng: -5.614366,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Pecio las Gorgonias',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 27,
      name: 'Puerto Pajares',
      description: 'Este pecio es de los mejor conservados de toda la costa andaluza, encontrándose prácticamente intacto. Durante la inmersión, además de conocer el barco, nos asombrará la variedad y cantidad de vida marina que lo habita.',
      lat: 36.006718,
      lng: -5.614786,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Puerto Pajares',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    // La Herradura, Granada
    {
      id: 4,
      name: 'Piedra del Hombre',
      description: 'Sumérgete en las aguas de La Herradura y descubre la mágica Piedra del Hombre, un punto de inmersión lleno de vida marina y formaciones rocosas impresionantes.',
      lat: 36.725195,
      lng: -3.736782,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Piedra del Hombre',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 5,
      name: 'La Calita (Fogarín)',
      description: 'Sumérgete en La Calita en la hermosa localidad de La Herradura, Granada, y explora un paraíso subacuático escondido lleno de tesoros marinos.',
      lat: 36.721452,
      lng: -3.735783,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'La Calita (Fogarín)',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 6,
      name: 'Piedras Altas',
      description: 'Desciende rápidamente a unos 30 metros de profundidad y explora un fascinante paisaje de grandes bloques de roca que dan nombre a este punto de inmersión.',
      lat: 36.719282,
      lng: -3.733742,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Piedras Altas',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 7,
      name: 'Cueva del Jarro',
      description: 'Una impresionante grieta en el acantilado que se extiende bajo el agua, permitiéndote seguir las paredes que descienden verticalmente hasta alcanzar un lecho de arena a unos 35 metros de profundidad.',
      lat: 36.719701,
      lng: -3.730140,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Cueva del Jarro',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 8,
      name: 'Punta de la Mona',
      description: ' Comienza a poca profundidad, alrededor de los 8 o 10 metros, y sigue a lo largo de una de las paredes de La Punta de la Mona, que alberga una abundante vida marina en sus recovecos y está adornada con un colorido coral.naranja ',
      lat: 36.719373,
      lng: -3.727143,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Punta de la Mona',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 9,
      name: 'Piedra de la Higuera',
      description: 'Esta área está repleta de grietas y es el hogar de una diversa vida marina que incluye congrios, morenas, brótolas, meros, pulpos y una gran variedad de nudibranquios.',
      lat: 36.721344,
      lng: -3.727254,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Piedra de la Higuera',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 10,
      name: 'Roqueo de los 14',
      description: 'Esta inmersión te lleva a una pequeña cueva habitada por cardenales, y si tienes suerte, podrías avistar caballitos de mar y otras especies típicas de la zona. Una experiencia submarina versátil adecuada para buceadores de todos los niveles.',
      lat: 36.720892,
      lng: -3.728321,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Roqueo de los 14',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 11,
      name: 'Punta del Vapor',
      description: 'Desde la playa de los Berengueles hasta el peñón de las caballas, es un emocionante roqueo de inmersión que, a pesar de su proximidad a la playa y al puerto de Marina del Este, ofrece una biodiversidad asombrosa.',
      lat: 36.722535,
      lng: -3.726630,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Punta del Vapor',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 12,
      name: 'Los Pasadizos',
      description: ' A pesar de la poca profundidad, la vida marina es abundante en este laberinto submarino, y podemos explorar numerosos pasadizos sin repetir ninguno. Incluso podemos aventurarnos en la cala de las Doncellas para admirar sus paredes naranjas y ascender junto al cabo de la boya.',
      lat: 36.739404,
      lng: -3.785575,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Los Pasadizos',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 13,
      name: 'Cuevas de Cantarriján',
      description: 'A solo diez metros de profundidad, podrás observar la abundante fauna típica de la zona, así como una rica vida bentónica característica de las cuevas, que incluye gorgonias, tembladeras, gambitas y más.',
      lat: 36.737285,
      lng: -3.779274,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Cuevas de Cantarriján',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 14,
      name: 'Los Candelabros',
      description: 'Desde el punto de fondeo, seguimos una línea de roca con fondo de arena a unos 15 metros de profundidad, llegando a una esquina donde emergen las cuadernas de una antigua barca de pesca, que da nombre a la inmersión.',
      lat: 36.732075,
      lng: -3.773986,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Los Candelabros',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 15,
      name: 'La Huerta',
      description: 'Grandes bloques de piedra están completamente cubiertos de organismos bentónicos, incluyendo el vibrante coral naranja (Astroides calycularis), la anémona incrustante amarilla (Parazoanthus axinellae) y varios tipos de corales, actinias y esponjas.',
      lat: 36.731059,
      lng: -3.772353,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'La Huerta',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 16,
      name: 'Territorio Congrio',
      description: 'Se encuentra en la zona central del acantilado de Cerro Gordo y ofrece una inmersión estilo caribeña a lo largo de una pared con un fascinante roqueo habitado por una gran cantidad de congrios y brótolas. ',
      lat: 36.729379,
      lng: -3.768826,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Territorio Congrio',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    /*{
      id: 16,
      name: 'Cueva del Sifón',
      description: 'Se encuentra en la zona central del acantilado de Cerro Gordo y ofrece una inmersión estilo caribeña a lo largo de una pared con un fascinante roqueo habitado por una gran cantidad de congrios y brótolas. ',
      lat: 36.728933,
      lng: -3.764829,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Cueva del Sifón',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },*/
    {
      id: 17,
      name: 'Los Molinos',
      description: 'Se encuentra en la zona central del acantilado de Cerro Gordo y ofrece una inmersión estilo caribeña a lo largo de una pared con un fascinante roqueo habitado por una gran cantidad de congrios y brótolas. ',
      lat: 36.731044,
      lng: -3.761825,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Los Molinos',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    {
      id: 18,
      name: 'Cala Iza',
      description: 'Podrás observar bancos de salpas, sargos y ocasionalmente pulpos vagando por el fondo. No es raro encontrarse con las llamativas medusas Cotylorhiza tuberculata, conocidas como "huevos fritos", flotando en el agua o cerca de la superficie.',
      lat: 36.732970,
      lng: -3.761569,
      additionalInfo: {
        sections: [
          {
            type: 'title',
            content: 'Cala Iza',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_1',
          },
          {
            type: 'paragraph',
            content: 'Este es un párrafo de texto relacionado con el lugar de inmersión.',
          },
          {
            type: 'image',
            content: 'url_de_la_imagen_2',
          },
        ],
      },
    },
    // Agrega más lugares de inmersión aquí (https://www.buceonatura.com/inmersiones/)*/
  ];

export default diveSpots;
  