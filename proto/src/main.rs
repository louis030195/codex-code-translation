fn main() {
    tonic_build::configure()
        .build_client(false)
        .out_dir("../server/src/pb")
        .compile(
            &["proto/translations.proto"],
            &["proto"],
        )
        .unwrap();
}
