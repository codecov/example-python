def hello_world(language: str) -> str | None:
    translations = {
        "english": "Hello, World",
        "portuguese": "Olá, Mundo",
        "dutch": "Hallo, Wereld",
        "french": "Salut, Monde",
    }
    return translations.get(language)


def something():
    return "Something"
