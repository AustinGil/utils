/**
 * Force WordPress Login Page to mirror the Gutenberg wp:site-logo Block
 */
add_action( 'login_enqueue_scripts', 'sync_gutenberg_site_logo_to_login' );
function sync_gutenberg_site_logo_to_login() {
    // Retrieve the media attachment ID saved by the wp:site-logo block
    $block_logo_id = get_option( 'site_logo' );

    if ( $block_logo_id ) {
        // Resolve the raw media file URL from the database attachment ID
        $logo_src = wp_get_attachment_image_src( $block_logo_id, 'full' );
        
        if ( ! empty( $logo_src[0] ) ) {
            $logo_url = $logo_src[0];
            
            // Adjust frame constraints for the login page markup
            $frame_width  = '100%';
            $frame_height = '80px'; 
            ?>
            <style type="text/css">
                #login h1 a, .login h1 a {
                    background-image: url(<?php echo esc_url( $logo_url ); ?>) !important;
                    width: <?php echo esc_attr( $frame_width ); ?> !important;
                    height: <?php echo esc_attr( $frame_height ); ?> !important;
                    background-size: contain !important;
                    background-repeat: no-repeat !important;
                    background-position: center bottom !important;
                    padding-bottom: 15px !important;
                }
            </style>
            <?php
        }
    }
}

/**
 * Update the destination anchor to route back to your homepage domain
 */
add_filter( 'login_headerurl', 'redirect_login_logo_to_home' );
function redirect_login_logo_to_home() {
    return home_url();
}

/**
 * Swap alternative accessibility text to reflect your active Site Title
 */
add_filter( 'login_headertext', 'update_login_logo_accessibility_title' );
function update_login_logo_accessibility_title() {
    return get_bloginfo( 'name' );
}
