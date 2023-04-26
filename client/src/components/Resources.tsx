import {CSSTransition} from "react-transition-group";

interface ResourceProps {
    title: string;
    link: string;
    image?: string;
}

const FALLBACK_IMAGE: string = "https://img.icons8.com/ios-glyphs/24/333333/search--v1.png";
const resources: ResourceProps[] = [
    {title: "Glassdoor", link: "https://glassdoor.ca", image: "https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/333333/external-glassdoor-a-website-where-current-and-former-employees-anonymously-review-companies-logo-bold-tal-revivo.png"},
    {title: "LinkedIn", link: "https://linkedin.com/", image: "https://img.icons8.com/ios-filled/24/333333/linkedin.png"},
    {title: "Indeed", link: "https://indeed.ca/", image: "https://img.icons8.com/windows/24/333333/indeed.png"},
    {title: "Wellfound", link: "https://angel.co/jobs"},
    {title: "Fishbowl", link: "https://www.fishbowlapp.com"},
    {title: "Monster", link: "https://www.monster.ca"},
    {title: "ITjobs.ca", link: "https://www.itjobs.ca/en/"}
]

function Resources(): JSX.Element {

    return (
        <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
            <div id={"resources-content"}>
                <div id={"resources-content-wrapper"}>
                    {resources.map((item, index) => {
                        return (
                            <a href={item.link} key={index} rel={"noreferrer"} target={"_blank"}>
                                {item.title}
                                <img src={item.image ? item.image : FALLBACK_IMAGE} alt={item.title}/>
                            </a>
                        )
                    })}
                </div>
            </div>
        </CSSTransition>
    );
}

export default Resources;