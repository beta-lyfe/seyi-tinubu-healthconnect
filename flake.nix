{
  description = "Nix flake for Beta Lyfe";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=release-24.05";
  };

  outputs = { self, nixpkgs }:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
  in {
    packages = { };

    devShells.${system} = {
      default = pkgs.mkShell {
        buildInputs = with pkgs; [
          python3
          ruff
        ];
      };
    };
  };
}
