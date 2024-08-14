# Copyright (c) Mysten Labs, Inc.
# SPDX-License-Identifier: Apache-2.0

"""A script to automatically update all known Walrus sites in this repository.

It reads a configuration that provides the directories of the sites and their object IDs, and calls
the site-builder CLI.
"""

import os
import subprocess
from argparse import ArgumentParser, Namespace

import yaml
from pydantic import BaseModel, TypeAdapter

SITE_BUILDER = "site-builder"
SITE_BUILDER_CONFIG = "~/.config/walrus/site-builder-config.yaml"
CONFIG = "publish-config.yaml"


class Site(BaseModel):
    name: str
    object_id: str
    path: os.PathLike

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.path = os.path.expanduser(kwargs["path"])


sites_ta = TypeAdapter(list[Site])


def parse_args() -> Namespace:
    parser = ArgumentParser(
        description="Update all known Walrus sites in this repository. NOTE: This \
        script require the walrus CLI and the site-builder CLI to be installed. \
        Further, the script can only be called by the owner of the sites."
    )
    parser.add_argument("--builder-config", default=SITE_BUILDER_CONFIG)
    parser.add_argument("--builder-bin", default=SITE_BUILDER)
    parser.add_argument("--config", default=CONFIG)
    return parser.parse_args()


def read_config(filename: str) -> list[Site]:
    with open(filename, "r") as infile:
        config = yaml.safe_load(infile.read())
    sites = sites_ta.validate_python(config)
    return sites


def update_site(builder_name: str, builder_config: str, site: Site) -> None:
    print(
        f"Update site {site.name} with object ID {site.object_id} at path {site.path}"
    )
    cmd = [
        builder_name,
        "--config",
        builder_config,
        "update",
        site.path,
        site.object_id,
        "--force",
    ]
    print(" ".join(cmd))
    subprocess.run(cmd, check=True)


def main():
    args = parse_args()
    print(f"Running with the config: {SITE_BUILDER_CONFIG}")
    config = read_config(args.config)
    print("Sites to update:")
    for site in config:
        print(f"  - {site.name}")
    print("NOTE: THIS SCRIPT CAN ONLY BE CALLED BY THE OWNER OF THE SITES.\n")
    print("Continue? [Enter/Ctrl+c]")
    input()
    for site in config:
        update_site(args.builder_bin, os.path.expanduser(args.builder_config), site)


if __name__ == "__main__":
    main()
