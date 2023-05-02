const KEY = "25bfcdb5-0bec-4d0d-a8fd-59827ce618cd"
// const URL = "https://talkify.net/api/speech/v1"

// type talkifyRequestParams = {
//     text: string;
//     format: string;
//     voice: string;
//     rate: number;
//     textType: string | number;
//     pitch: number;
// }

export const getTTS = async () => {
    const text = "Hello,_world!";

    fetch(`https://talkify.net/api/speech/v1?key=${KEY}?&text=${text}&voice=David`)
        .then(res => {
            if (! res.ok )
                throw Error("Error while fetching")
            return res.blob()
        })
        .then(blob => {
            const url = URL.createObjectURL(blob)
            const audio = new Audio(url)
            audio.play()
        })
        .catch(err => console.error(err))
}