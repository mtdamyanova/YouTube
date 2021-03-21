const videos = [
    {
        'id': "31ee4649-83c3-4e7c-900e-41a96cbe018e",
        'url': 'https://v.ftcdn.net/04/18/07/01/240_F_418070104_TXXlp63Lf6e1cVxsQbS4caLA2NbpSdvm_ST.mp4',
        'author': 'Konfuz',
        'title': 'Ратата/Ratatatata',
        'duration': '0.11'
    },
    {
        'id': "f1649485-6650-474a-91ac-adfb753a8ac7",
        'url': 'https://v.ftcdn.net/04/19/27/81/240_F_419278143_28u7vSShiLOEUW5cNkxU5H6oLmnmGen9_ST.mp4',
        'author': 'Miley Cyrus, Dua Lipa',
        'title': 'Prisoner',
        'duration': '0.19'
    },
    {
        'id': "0f106e12-1888-4d73-92ed-d2fd6bb435ce",
        'url': 'https://v.ftcdn.net/04/20/96/20/240_F_420962031_RUNOpWPDOXQGNsXBiBRxG4k8KW0zCh1U_ST.mp4',
        'author': 'TONES AND I',
        'title': 'Dance monkey',
        'duration': '0.24'
    },
    {
        'id': "598903ef-d5af-45fa-be3a-be33ab18e1f1",
        'url': 'https://v.ftcdn.net/04/19/44/64/240_F_419446488_OU83I1d47vEZGvm6WbUIe5P9HIchEPLT_ST.mp4',
        'author': 'Joel Corry x MNEK',
        'title': 'Head & Heart',
        'duration': '0.19'
    },
    {
        'id': "16503dfe-e3d7-48b0-809a-819f38152c3d",
        'url': 'https://v.ftcdn.net/04/19/96/73/240_F_419967302_9uoMGRSa02VKGGmXbvAuECMLNcQLoGVo_ST.mp4',
        'author': 'Imagine Dragons',
        'title': 'Whatever It Takes',
        'duration': '0.13'
    },
    {
        'id': "c3d727c2-5708-4b3f-b4fe-a9031eed3dd3",
        'url': 'https://v.ftcdn.net/04/18/54/93/240_F_418549315_uk2V1ffWGPrd3MpNR8lSCZbuWWDKbKGL_ST.mp4',
        'author': 'Take Me To Church',
        'title': 'Hozier',
        'duration': '0.15'
    },
    {
        'id': "a5e16ccb-9027-49c0-82d2-13642745d966",
        'url': 'https://v.ftcdn.net/04/17/62/53/240_F_417625375_w740Mn96YYGVo3WshOVnTpOIwho7wKMi_ST.mp4',
        'author': 'SAINt JHN',
        'title': 'Roses',
        'duration': '0.20'
    },
    {
        'id': "be670dcb-2efb-439f-a219-b27c5345e555",
        'url': 'https://v.ftcdn.net/04/17/38/10/240_F_417381044_C0SuNTQFvpYIhq24iD2rc0b8JszkVFOY_ST.mp4',
        'author': 'Topic, A7S',
        'title': 'Breaking Me',
        'duration': '0.10'
    },
    {
        'id': "d317f213-99b7-4a6e-bf14-35e6baf562a4",
        'url': 'https://v.ftcdn.net/04/16/78/14/240_F_416781486_iXZ3iKivZQdhj20tLeGx3TU7yMIdw9NU_ST.mp4',
        'author': 'Dynoro & Fumaratto',
        'title': 'Me Provocas',
        'duration': '0.09'
    },
    {
        'id': "a33d1a12-043e-41bb-abdb-27ad60f5d0d6",
        'url': 'https://v.ftcdn.net/04/19/39/24/240_F_419392479_vedPYtzG86LkqXfNTxso1ztGMf6hT7FE_ST.mp4',
        'author': 'Avicii',
        'title': 'Wake Me Up',
        'duration': '0.13'
    },
    {
        'id': "201f662d-de08-49c0-9d9c-9b54a2a652dc",
        'url': 'https://v.ftcdn.net/04/19/20/22/240_F_419202226_lcYL9FwpCEZXaNTElmLwIlhNget3Sfa4_ST.mp4',
        'author': 'Maroon 5',
        'title': 'Memories',
        'duration': '0.14'
    },
    {
        'id': "37da9b99-613a-4b14-9cc6-2cd65ca04ac7",
        'url': 'https://v.ftcdn.net/04/17/68/11/240_F_417681108_RlVthyQkjZrEe5jH74LAHFDSRm0SA5RR_ST.mp4',
        'author': '24kGoldn, Iann Dior',
        'title': 'Mood',
        'duration': '0.09'
    },
    {
        'id': "8901b7ed-c448-4133-a9e0-f9139e07eca4",
        'url': 'https://v.ftcdn.net/04/16/30/98/240_F_416309869_bLUsSEs5Gac0IZXgXzlCCgsHX7KxIdFk_ST.mp4',
        'author': 'Deep House Mix 2021',
        'title': 'TSG'
    },
    {
        'id': "ab0dfcc5-d9bc-4e1d-aa36-2236d7f1cdfb",
        'url': 'https://v.ftcdn.net/04/18/43/47/240_F_418434766_4cnb4EA1C7eEHUhF03bl9cKR2iS4c5DX_ST.mp4',
        'author': 'Mascota',
        'title': 'Autumn-Winter Fashion 2020',
        'duration': '0.08'
    },
    {
        'id': "41fb79e7-6a5b-496c-9618-75f185745783",
        'url': 'https://v.ftcdn.net/04/18/15/61/240_F_418156122_yIbRLW1d3sI1kakQNbgOXw8S0ebGu8Ci_ST.mp4',
        'author': 'Martin Garrix',
        'title': 'Forbidden Voices',
        'duration': '0.09'
    },
    {
        'id': "58684c43-0a87-4575-8941-b3e04e7bb3cd",
        'url': 'https://v.ftcdn.net/04/17/13/43/240_F_417134324_1dhtOPGDjyHP3o1670SK5Ke8sg2Pv8Kn_ST.mp4',
        'author': 'Mascota & D-Trax feat. Poli Hubavenska',
        'title': 'Zaidi',
        'duration': '0.11'
    },
];

export default videos;