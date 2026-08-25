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


def run(command):
    print(f"$ {' '.join(command)}")
    subprocess.run(command, check=True)


def main():
    if len(sys.argv) != 2:
        print("Usage: python tag_images.py <version>")
        print("Exemple: python tag_images.py v1.0.1")
        sys.exit(1)

    version = sys.argv[1]

    print(f"\n[START] Tagging images -> {version}\n")

    for image in IMAGES:
        source = f"{REGISTRY}/{image}:latest"
        target = f"{REGISTRY}/{image}:{version}"

        run(["docker", "tag", source, target])

        print(f"✓ {source} -> {target}")

    print("\n[END] Tagging completed")


if __name__ == "__main__":
    main()