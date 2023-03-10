function Resources() {

    const resources = [
        {title: "Glassdoor", link: "https://glassdoor.ca", image: "https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/E7EFFF/external-glassdoor-a-website-where-current-and-former-employees-anonymously-review-companies-logo-bold-tal-revivo.png"},
        {title: "LinkedIn", link: "https://linkedin.com/", image: "https://img.icons8.com/ios-filled/24/E7EFFF/linkedin.png"},
        {title: "Indeed", link: "https://indeed.ca/", image: "https://img.icons8.com/windows/24/E7EFFF/indeed.png"},
        {title: "Wellfound", link: "https://angel.co/jobs", image: "https://img.icons8.com/ios/24/E7EFFF/angel-with-sword.png"},
        {title: "Fishbowl", link: "https://www.fishbowlapp.com", image: "https://img.icons8.com/external-icons-smashing-stocks/24/E7EFFF/external-Fishbowl-hobbies-icons-icons-smashing-stocks.png"},
    ]

    return (
        <div id={"resources-content"}>
            <div id={"resources-content-wrapper"}>
                {resources.map((item, index) => {
                    return (
                        <a
                            href={item.link}
                            key={index}
                            rel={"noreferrer"}
                            target={"_blank"}
                        >
                            {item.title}
                            <img src={item.image} alt={item.title}/>
                        </a>
                    )
                })}
            </div>
        </div>
    );
}

export default Resources;