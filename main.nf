nextflow.enable.dsl=2

process QC {
    input:
    path reads

    output:
    path "qc.txt"

    script:
    """
    echo "QC done for ${reads}" > qc.txt
    """
}

workflow {
    Channel
        .fromPath("data/*.fastq.gz")
        .set { reads_ch }

    QC(reads_ch)
}
