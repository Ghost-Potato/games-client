//define publisher

type PublisherProps = {
    name: string;
    yearFounded: number;
}

export default function Publisher({name, yearFounded}: PublisherProps){
    return(
        <article>
            <h3>{name}</h3>
            <p>Founded: {yearFounded}</p>
        </article>
    )
}