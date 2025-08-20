'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 px-6 m-2 sm:m-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Section Contact */}
                    <div className="text-center md:text-left">
                        <div className="space-y-2">
                            <p className="text-lg">+33 6 95 43 73 84</p>
                            <p className="text-lg">
                                <a
                                    href="mailto:valentinedutertre@gmail.com"
                                    className="underline hover:text-gray-300 transition-colors"
                                >
                                    valentinedutertre@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Section Réseaux Sociaux */}
                    <div className="text-center md:text-right">
                        <div className="flex justify-center md:justify-end gap-4">
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/valentinedutertre/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 transition-opacity hover:scale-110 transform duration-200"
                                aria-label="Instagram"
                            >
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="w-16 h-16 text-2xl"
                                />
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/valentine-dutertre-889879338/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 transition-opacity hover:scale-110 transform duration-200"
                                aria-label="LinkedIn"
                            >
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    className="w-16 h-16 text-2xl"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-center">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} Valentine Dutertre. Tous droits réservés.
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Développé par{' '}
                        <a
                            href="https://pryzm.agency/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            Pryzm Agency
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
