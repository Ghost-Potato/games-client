//child component
import Publisher from "../components/publisher";

export default function Home(){
    return(
        <main>
            <h1>About This Site</h1>
            <p>We're building this for COMP2068G in Winter 2026 @ LU</p>
            <h2>Our Game Publishers</h2>
            <Publisher name="Nintendo" yearFounded={1889}/>
            <Publisher name="FromSoftware" yearFounded={1986}/>
            <Publisher name="Sega" yearFounded={1960}/>
            <Publisher name="Capcom" yearFounded={1979}/>
        </main>
    );
}