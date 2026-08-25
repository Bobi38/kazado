import subprocess
import sys

IMAGES = [
    "kaz-mysql",
    "kaz-init_db",
    "kaz-gateway",
    "kaz-user",
    "kaz-resa",
    "kaz-calendar",
    "kaz-front",
]

REGISTRY = "bobi38"
DOC = "kazado"


def run(command):
    print(f"$ {' '.join(command)}")
    subprocess.run(command, check=True)


def main():
    if len(sys.argv) != 2:
        print("Usage: python tag_images.py <version>")
        print("Exemple: python tag_images.py v1.0.1")
        sys.exit(1)

    version = sys.argv[1]

    print(f"\n[START] push images\n")

    for image in IMAGES:
        source = f"{REGISTRY}/{image}:{version}"

        run(["docker", "push", source])

        print(f"✓ {source}")

    print("\n[END] push completed")


if __name__ == "__main__":
    main()