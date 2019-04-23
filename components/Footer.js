import Link from 'next/link'

export default function Footer() {
    return (
        <div>
            <footer className="mt-3 pt-3 d-flex flex-column">
                <h5 className="text-white font-italic text-center pt-2">Members of the Horizon Energy Group</h5>
                <ul className="nav justify-content-center p-2">
                    <li className="nav-item px-2"><a className="text-white" href="http://www.aquaheat.co.nz"
                                                     target="_blank">Aquaheat New Zealand</a></li>
                    <li className="nav-item px-2"><a className="text-white" href="http://www.coollogic.co.nz"
                                                     target="_blank">Cool Logic</a></li>
                    <li className="nav-item px-2"><a className="text-white" href="http://www.electriserv.co.nz"
                                                     target="_blank">ElectriServ</a></li>
                    <li className="nav-item px-2"><a className="text-white" href="http://www.horizonnetworks.nz"
                                                     target="_blank">Horizon Networks</a></li>
                    <li className="nav-item px-2"><a className="text-white" href="http://www.electrinet.co.nz/"
                                                     target="_blank">ElectriNET</a></li>
                </ul>
                <ul className="nav justify-content-center p-2">
                    <li className="social px-2"><h4><a className="text-white"
                                                       href="https://www.facebook.com/Horizon-Energy-Group-386326161751408/"><i
                        className="fab fa-facebook-square"/></a></h4></li>
                    <li className="social px-2"><h4><a className="text-white"
                                                       href="https://www.youtube.com/channel/UC28MRghP08quGyDYX_fljzw"><i
                        className="fab fa-youtube-square"/></a></h4></li>
                    <li className="social px-2"><h4><a className="text-white"
                                                       href="https://www.linkedin.com/company-beta/18100442/">
                        <i className="fab fa-linkedin"/></a></h4></li>
                </ul>
            </footer>

            <style jsx>{`
          footer {
            background-color: #102d54;
          }
        `}</style>
        </div>
    )
}



