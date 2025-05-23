import React from "react";

const TextSection: React.FC = () => {
    const items = [
        {
            icon: "🚀",
            title: "MLADI U SLUŽBI DIGITALIZACIJE SELA",
            description:
                "Grupa mladih, koja uči elektroniku i programiranje, kroz ovaj projekat izlazi iz laboratorija i primjenjuje digitalna rješenja u stvarnim situacijama, pomažući lokalnim poljoprivrednicima i podržavajući razvoj Smart Village modela.",
        },
        {
            icon: "📷",
            title: "MLADI I MULTIMEDIJA",
            description:
                "Projekat podržava razvoj kreativne zajednice mladih koja kroz multimediju osnažuje lokalne poslovne inicijative, posebno one mladih poljoprivrednika. Tim stvara visokokvalitetne multimedijalne sadržaje koji promovišu ruralni biznis i proizvode.",
        },
        {
            icon: "🖥️",
            title: "DIGITALNI HUB ZA RAZVOJ",
            description:
                "Lokalni Dom kulture postaje Hub za mlade i poljoprivrednike, omogućavajući im usvajanje digitalnih tehnologija. Ovaj prostor podržava radionice, promocije i razvoj poslovnih modela, čineći lokalne proizvođače konkurentnijima.",
        },
    ];

    return (
        <section className="section">
            <div className="container">
                <div className="text-content">
                    <p className="subheading">
                        DIGITALIZUJMO SELA ZAJEDNO!
                    </p>
                    <h2 className="main-heading">
                        NAŠA PRIČA JE PRIČA O ZNANJU, SARADNJI I POVJERENJU. DIGITALIZUJMO SELA ZAJEDNO!
                    </h2>
                    <div className="grid-container">
                        {items.map((item, index) => (
                            <div key={index} className="grid-item">
                                <div className="icon-container">
                                    {item.icon}
                                </div>
                                <h3 className="item-title">{item.title}</h3>
                                <p className="item-description">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TextSection;
