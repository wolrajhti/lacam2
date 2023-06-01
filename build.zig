const std = @import("std");

pub fn build(b: *std.build.Builder) void {
    const target = b.standardTargetOptions(.{});
    const mode = b.standardReleaseOptions();

    const flags = &.{
        "-std=c++17",
        "-O3",
        "-Wall",
        "-W",
        "-Wstrict-prototypes",
        "-Wwrite-strings",
        "-Wno-missing-field-initializers",
    };

    const argparse = b.addStaticLibrary("argparse", null);
    argparse.setTarget(target);
    argparse.setBuildMode(mode);
    argparse.linkLibC();
    argparse.linkLibCpp();
    argparse.force_pic = true;
    argparse.addCSourceFiles(&.{
        "third_party/include/argparse/argparse.hpp",
    }, flags);

    const lacam2 = b.addStaticLibrary("lacam2", null);
    lacam2.setTarget(target);
    lacam2.setBuildMode(mode);
    lacam2.linkLibC();
    lacam2.linkLibCpp();
    lacam2.force_pic = true;
    lacam2.addCSourceFiles(&.{
        "lacam2/src/dist_table.cpp",
        "lacam2/src/graph.cpp",
        "lacam2/src/instance.cpp",
        "lacam2/src/lacam2.cpp",
        "lacam2/src/planner.cpp",
        "lacam2/src/post_processing.cpp",
        "lacam2/src/utils.cpp"
    }, flags);

    const main = b.addExecutable("main", null);
    main.setTarget(target);
    main.setBuildMode(mode);
    main.install();
    main.linkLibC();
    main.linkLibCpp();
    main.linkLibrary(lacam2);
    main.addIncludePath("lacam2/include");
    main.addIncludePath("third_party/argparse/include");
    main.addCSourceFiles(&.{
        "main.cpp",
    }, &.{
        "-std=c++17",
        "-pedantic",
        "-Wall",
        "-W",
        "-Wno-missing-field-initializers",
    });
}