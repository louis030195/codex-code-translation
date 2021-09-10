fn main() {
    tonic_build::configure()
        .build_client(false)
        .out_dir("../server/src/pb")
        .compile(
            &["proto/products.proto", "proto/audit_log.proto"],
            &["proto"],
        )
        .unwrap();
}
