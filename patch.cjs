const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

content = content.replace(/Aura/g, 'We Travel Nepal');

// Navbar
content = content.replace('<a href="#features" className="nav-link hover-lift">Design</a>', '<a href="#features" className="nav-link hover-lift">Destinations</a>');
content = content.replace('<a href="#philosophy" className="nav-link hover-lift">Craft</a>', '<a href="#philosophy" className="nav-link hover-lift">Tours</a>');
content = content.replace('<a href="#protocol" className="nav-link hover-lift">Atelier</a>', '<a href="#protocol" className="nav-link hover-lift">About</a>');
content = content.replace('<span className="relative z-10">Discover</span>', '<span className="relative z-10">Book Now</span>');

// Hero
content = content.replace('Elegance beyond', 'Journey beyond');
content = content.replace('Time.', 'Limits.');
content = content.replace('We Travel Nepal — a timeless architecture. Designing elegance inside a physical frontier. The next evolution of luxury.', 'We Travel Nepal — discover the untouched beauty. Exploring the Himalayas and rich heritage. The ultimate adventure.');
content = content.replace('<span className="relative z-10">Discover Collection</span>', '<span className="relative z-10">Discover Destinations</span>');

// Features
content = content.replace('The We Travel Nepal Standard', 'The Nepal Standard');
content = content.replace('Craftsmanship elevated beyond mere creation. A philosophy of meticulous detail and uncompromising quality.', 'Adventures elevated beyond mere travel. A philosophy of meticulous planning and unforgettable experiences.');

// Card 1
content = content.replace('01 / Foundation', '01 / Treks');
content = content.replace('Timeless Design', 'Thrilling Treks');
content = content.replace('Silhouettes engineered to endure. We eschew fleeting trends in favor of classical proportions reimagined for the modern era.', 'Trails engineered to endure. We eschew fleeting trends in favor of classical paths reimagined for the modern explorer.');

// Card 2
content = content.replace('02 / Execution', '02 / Heritage');
content = content.replace('Exquisite Craftsmanship', 'Rich Heritage');
content = content.replace("Each piece is a testament to the artisan's touch. Forged, cut, and shaped by hands dedicated to absolute mastery of their medium.", "Each temple is a testament to the artisan's touch. Built and shaped by hands dedicated to absolute mastery of their culture.");

// Card 3
content = content.replace('03 / Refinement', '03 / Wilderness');
content = content.replace('Unparalleled Detail', 'Untamed Wilderness');
content = content.replace('Perfection resides in the microcosm. We obsess over the unseen elements as fiercely as the visible, ensuring profound harmony.', 'Perfection resides in the wild. We obsess over the unseen elements as fiercely as the visible, ensuring profound harmony with nature.');

// Philosophy
content = content.replace('The true essence of luxury lies within.', 'The true essence of adventure lies within.');
content = content.replace('structural elegance', 'untouched trails');
content = content.replace('and absolute perfection.', 'and unforgettable memories.');

// Atelier
content = content.replace('Curation of Elements', 'Arrival & Exploration');
content = content.replace('Only the most exceptional materials are chosen. A rigorous selection process ensures absolute harmony before the first incision is made.', 'Only the most exceptional places are chosen. A rigorous selection process ensures absolute harmony before the first trek is made.');

content = content.replace("The Master's Cut", 'The Himalayan Trek');
content = content.replace('Decades of refined intuition guide the tools. The raw potential is slowly coaxed into a silhouette of defining elegance.', 'Decades of refined intuition guide the trails. The raw potential is slowly coaxed into an adventure of defining elegance.');

content = content.replace('Final Radiance', 'Rest & Reflection');
content = content.replace('The surface is brought to life. A final meticulous polish reveals the soul of the piece, ready to endure generations.', 'The journey is brought to life. A final meticulous rest reveals the soul of the adventurer, ready to endure generations.');

// CTA
content = content.replace('Experience We Travel Nepal.', 'Experience Nepal.');
content = content.replace('Arrange a private viewing to witness the culmination of design and absolute craftsmanship.', 'Arrange a private tour to witness the culmination of culture and absolute adventure.');
content = content.replace('<span className="relative z-10">Request Invitation</span>', '<span className="relative z-10">Request Booking</span>');

// Footer
content = content.replace('Designing elegance inside a physical frontier.', 'Designing adventures inside a natural frontier.');

content = content.replace('<a href="#features" className="text-ghost/70 hover:text-plasma transition-colors">Design</a>', '<a href="#features" className="text-ghost/70 hover:text-plasma transition-colors">Destinations</a>');
content = content.replace('<a href="#philosophy" className="text-ghost/70 hover:text-plasma transition-colors">Craft</a>', '<a href="#philosophy" className="text-ghost/70 hover:text-plasma transition-colors">Tours</a>');
content = content.replace('<a href="#protocol" className="text-ghost/70 hover:text-plasma transition-colors">Atelier</a>', '<a href="#protocol" className="text-ghost/70 hover:text-plasma transition-colors">About</a>');

content = content.replace('<a href="#" className="text-ghost/70 hover:text-plasma transition-colors">Boutiques</a>', '<a href="#" className="text-ghost/70 hover:text-plasma transition-colors">Contact</a>');

content = content.replace('© {new Date().getFullYear()} We Travel Nepal Design Studio. All rights reserved.', '© {new Date().getFullYear()} We Travel Nepal. All rights reserved.');

fs.writeFileSync('src/App.jsx', content);
