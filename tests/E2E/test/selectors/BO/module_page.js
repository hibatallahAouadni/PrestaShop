module.exports = {
    ModulePage: {
        modules_subtab: '#subtab-AdminParentModulesSf',
        upload_button: '//*[@id="page-header-desc-configuration-add_module"]',
        zip_file_input: '//*[@id="importDropzone"]/input',
        installed_message: '//*[@id="importDropzone"]/div[3]/p[1]',
        close_modal_button: '//*[@id="module-modal-import-closing-cross"]',
        search_input: 'div.pstaggerAddTagWrapper > input',
        search_button: '.btn.btn-primary.pull-right.search-button',
        page_loaded: '.module-search-result-wording',
        installed_modules_tabs: '(//div[@class="page-head-tabs"]/a)[2]',
        modules_search_input: '.pstaggerAddTagInput',
        module_selection_input: '//input[contains(@class,"pstaggerAddTagInput ")]',
        modules_search_button: '//*[@id="main-div"]//button[contains(@class,"search-button")]',
        action_module_built_button: '//*[@id="modules-list-container-native"]//button[contains(@class,"module_action_menu_configure")]',
        success_install_message: '//*[@id="importDropzone"]/div[3]/i',
        option_button: '//*[@id="modules-list-container-native"]//button[contains(@class,"dropdown-toggle")]',
        uninstall_button: '//*[@id="modules-list-container-native"]//button[contains(@class,"module_action_menu_uninstall")]',
        uninstall_confirmation: '//*[@id="module-modal-confirm-prestafraud-uninstall"]//a[contains(@class,"module_action_modal_uninstall")]',
        built_in_module: '(//*[@id="main-div"]//div[contains(@class,"module-short-list")])[2]/span[1]',
        selection_search_button: '//*[@id="main-div"]//button[contains(@class,"search-button")]',
        install_button: '//*[@id="modules-list-container-all"]//button[contains(@class,"module_action_menu_install")]',
        config_legend_adwords: '//*[@id="content"]//h4[contains(@class,"page-subtitle")]',
        uninstall_adwords_module: '//*[@id="module-modal-confirm-gadwords-uninstall"]//a[contains(@class,"module_action_modal_uninstall")]',
        more_option_button:'//*[@id="upgradeButtonBlock"]//input',
        channel_select:'//*[@id="advanced"]/select',
        archive_select:'//*[@id="for-useArchive"]//select',
        save_button:'//*[@id="advanced"]//input[contains(@class,"btn-primary")]',
        save_message:'//*[@id="configResult"]',
        version_number:'//*[@id="for-useArchive"]//input',
        upgrade_button:'//*[@id="upgradeNow"]',
        loader_tag:'//*[@id="pleaseWait" and contains(@style,"display: none;")]',
        upgrade_block:'//*[@id="upgradeButtonBlock"]',
        refresh_button:'//*[@id="upgradeButtonBlock"]/div/p[2]/a',
        module_import_success: '//*[@id="importDropzone"]/div[3]/p[1]',
        config_legend: '//*[@id="content"]//h4[contains(@class,"page-subtitle")]',
        uninstall_module: '//a[contains(@class,"module_action_modal_uninstall")]',
        disable_module: '//button[contains(@class,"module_action_menu_disable")]',
        confirmation_disable_module: '(//a[contains(@class,"module_action_modal_disable")])[1]',
        enable_module: '(//button[contains(@class,"module_action_menu_enable")])[1]'
    }
};