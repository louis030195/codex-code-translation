use structopt::StructOpt;
use tracing::error;
use tracing_subscriber::EnvFilter;

#[derive(StructOpt)]
struct Opts {
    #[structopt(name = "use_tls", long)]
    use_tls: bool,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::new("tonic_web=trace,server=trace"))
        .init();

    let matches = Opts::from_args();

    if let Err(e) = server::run(matches.use_tls).await {
        error!("{:?}", e)
    }
}
